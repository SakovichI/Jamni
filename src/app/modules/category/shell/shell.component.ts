import { animate, style, transition, trigger } from '@angular/animations';
import { HttpParams } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import nouislider from 'nouislider';
import { Subject, takeUntil } from 'rxjs';
import { ApiUserService } from 'src/app/core/api/api-user.service';
import { IUserFavorites } from 'src/app/interfaces/users-interface';
import { ApiCategoryService, ApiItemService } from '../../../core';
@Component({
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html',
  animations: [
    trigger('showAccordion', [
      transition(':enter', [
        style({ height: 0 }),
        animate('0.3s linear', style({ height: '*' })),
      ]),
      transition(':leave', [animate('0.3s linear', style({ height: 0 }))]),
    ]),
  ],
})
export class ShellComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('filter') filterMenu?: ElementRef;
  @ViewChild('sort') sortMenu?: ElementRef;
  public specId: number = 0;
  public values: any[] = [];
  public term: any;
  public price?: number;
  public categoryId: number = 0;
  public category: any;
  public products: any[] = [];
  public specsFormArray = new FormArray([]);
  public otherProducts: any[] = [];
  public sofasProduct: any[] = [];
  private destroyed$: Subject<any> = new Subject<any>();
  private lastScript: any;
  catalog: boolean = false;
  state: string = 'initial';
  public favoriteList: IUserFavorites[] = [];
  expand() {
    this.catalog = !this.catalog;
    this.state = this.catalog ? 'expanded' : 'initial';
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiCategoryService: ApiCategoryService,
    private apiItemService: ApiItemService,
    public userApi: ApiUserService
  ) {}

  ngOnDestroy() {
    this.destroyed$.next({});
    this.destroyed$.complete();
  }
  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((paramMap) => {
        this.categoryId = Number(paramMap.get('id'));
        if (this.categoryId) {
          this.fetchCategory();
          return;
        }
      });

    if (this.filterMenu?.nativeElement.classList.contains('active')) {
      this.filterMenu?.nativeElement.classList.remove('active');
    }
    if (this.sortMenu?.nativeElement.classList.contains('active')) {
      this.sortMenu?.nativeElement.classList.remove('active');
    }
    this.userApi.userFavoriteS
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.favoriteList = resp;
      });
  }
  ngAfterViewInit(): void {}

  private fetchCategory(): void {
    if (!this.categoryId) {
      return;
    }

    this.apiCategoryService.getCategory(this.categoryId).subscribe((elem) => {
      this.category = elem;
      this.products = this.category.items.filter(
        (el: any) => el.enabled === true
      );
    });
    this.apiCategoryService
      .getCategory(this.categoryId)
      .subscribe((category) => {
        this.category = category;
        this.products = this.category.items.filter(
          (el: any) => el.enabled === true
        );
        this.specsFormArray = new FormArray([
          new FormGroup({
            specification: new FormControl({
              id: 3,
              name: 'цена',
              valueType: 'NUMBER',
              filtered: true,
              values: [
                {
                  id: 1,
                  specId: 3,
                  value: 0,
                },
                {
                  id: 2,
                  specId: 3,
                  value: 500000,
                },
              ],
            }),
            from: new FormControl(0),
            to: new FormControl(600000),
          }),
        ]);
        category.specifications.forEach((spec: any) => {
          let formGroup: FormGroup;
          if (spec.valueType === 'CHAR') {
            formGroup = new FormGroup({
              specification: new FormControl(spec),
              values: new FormControl([]),
            });
          } else if (spec.valueType === 'NUMBER') {
            const values = spec.values.map((v: any) => parseInt(v.value, 10));
            formGroup = new FormGroup({
              specification: new FormControl(spec),
              from: new FormControl(Math.min(...values)),
              to: new FormControl(Math.max(...values)),
            });
          } else if (spec.valueType === 'COLOR') {
            formGroup = new FormGroup({
              specification: new FormControl(spec),
              values: new FormControl([]),
            });
          } else if (spec.valueType == 'BOOLEAN') {
            formGroup = new FormGroup({
              specification: new FormControl(spec),
              value: new FormControl(null),
            });
          }
          // @ts-ignore
          this.specsFormArray.push(formGroup);
        });
        setTimeout(() => {
          this.initSliders();
        }, 0);

        this.initOtherProducts();
      });
  }
  updateScript() {
    setTimeout(() => {
      const scriptOld = document.querySelector('[src="assets/main.js"]');
      if (scriptOld) {
        document.body.removeChild(scriptOld);
      }
    }, 20);
    setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'assets/main.js';
      document.body.appendChild(script);
    }, 50);
  }

  private initSliders(): void {
    const sliders = this.specsFormArray.controls.filter(
      (fg: any) => fg.controls.specification.value.valueType === 'NUMBER'
    );
    const sliderContainers = document.querySelectorAll('.nouislider-container');
    if (!sliders?.length) {
      return;
    }

    for (let i = 0; i < sliders.length; i++) {
      nouislider.create(sliderContainers[i] as HTMLElement, {
        start: [sliders[i].value.from, sliders[i].value.to],
        connect: true,
        range: {
          min: [sliders[i].value.from],
          max: [sliders[i].value.to],
        },
      });

      (sliderContainers[i] as any).noUiSlider.on(
        'update',
        function (values: any, handle: any) {
          (sliders[i] as FormGroup).controls[
            handle === 0 ? 'from' : 'to'
          ].setValue(Math.round(values[handle]));
        }
      );
    }
  }
  public addFilter(specId: number, values: any[], categoryId: number) {
    const filters = new HttpParams().append(
      'filters',
      JSON.stringify({
        specId: specId,
        values: values,
      })
    );
    this.apiCategoryService.getFilter(categoryId, filters).subscribe((el) => {
      this.category = el;
      this.products = this.category.items.filter(
        (el: any) => el.enabled === true
      );
    });
  }
  public deleteFilter(specId: number, values: any[], categoryId: number) {
    const filters = new HttpParams().delete(
      'filters',
      JSON.stringify({
        specId: specId,
        values: values,
      })
    );

    this.apiCategoryService.getFilter(categoryId, filters).subscribe((el) => {
      this.category = el;
      this.products = this.category.items.filter(
        (el: any) => el.enabled === true
      );
    });
  }

  public onCharSpecChange(
    specFormGroup: any,
    spec: any,
    checked: boolean,
    categoryId: number
  ) {
    if (checked) {
      specFormGroup
        .get('values')
        .setValue([...specFormGroup.get('values').value, spec]);
      let params;
      const values = specFormGroup.value.values;
      values.forEach((el: any) => {
        const filters = new HttpParams().append(
          'filters',
          JSON.stringify({
            specId: el.specId,
            values: [el.id],
          })
        );
        return (params = filters);
      });
      this.apiCategoryService.getFilter(categoryId, params).subscribe((el) => {
        this.category = el;
        this.products = this.category.items.filter(
          (el: any) => el.enabled === true
        );
      });
    } else {
      specFormGroup
        .get('values')
        .setValue(
          specFormGroup.get('values').value.filter((v: any) => v.id != spec.id)
        );
      this.deleteFilter(spec.specId, [spec.id], categoryId);
    }
  }
  public onBooleanSpecChange(specFormGroup: any, value: any) {
    if (value) {
      specFormGroup.get('value').setValue(value);
    } else {
      specFormGroup.get('value').setValue(null);
    }
  }

  private initOtherProducts(): void {
    this.apiItemService.listItems().subscribe((items) => {
      this.otherProducts = items
        .filter((el: any) => el.enabled === true)
        .slice(0, 10);
      this.updateScript();
    });
  }

  openFilter() {
    this.filterMenu?.nativeElement.classList.toggle('active');
  }
  openSort() {
    this.sortMenu?.nativeElement.classList.toggle('active');
  }
  favorites(id: number) {
    let data = { itemId: id, enabled: true };
    if (this.favoriteList.filter((el) => el.id === id).length > 0) {
      data = { itemId: id, enabled: false };
    } else {
      data = { itemId: id, enabled: true };
    }
    this.userApi
      .editFavorites(data)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {});
  }
  checkFavorites(id: number): boolean {
    if (this.favoriteList.filter((el) => el.id === id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  openAccordion(elem: any) {
    const accordion = elem.closest('.accordion');
    const title = accordion.querySelector('.accordion__title');
    const content = accordion.querySelector('.accordion__content');
    const icon = accordion.querySelector('.accordion__icon');
    content.classList.toggle('open-main');
    content.style.height = '100%';
    if (!content.classList.contains('open-main')) {
      accordion.setAttribute('aria-expanded', false);
      content.setAttribute('aria-hidden', true);
      icon.classList.remove('accordion__icon--active');
      content.style.height = 0;
    } else {
      accordion.setAttribute('aria-expanded', true);
      content.setAttribute('aria-hidden', false);
      icon.classList.add('accordion__icon--active');
      content.style.height = '100%';
    }
  }
}
