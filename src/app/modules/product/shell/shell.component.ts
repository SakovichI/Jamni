import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, forkJoin, mergeMap, takeUntil } from 'rxjs';
import { ApiUserService } from 'src/app/core/api/api-user.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import { IProduct } from 'src/app/interfaces/product-interface';
import { IUserFavorites } from 'src/app/interfaces/users-interface';
import { ApiCategoryService, ApiItemService } from '../../../core';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnDestroy, OnInit, AfterViewInit {
  private destroyed$: Subject<any> = new Subject<any>();
  public productId?: number;
  public product: IProduct = {} as IProduct;
  public formArray: FormArray = new FormArray([]);
  public ownSetCategories: any[] = [];
  public selectedOwnSetCategory: any;
  public otherProducts: any[] = [];
  public accordionViews: boolean = false;
  private lastScript: any;
  public favoriteList: IUserFavorites[] = [];
  public productImages: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public generalService: GeneralService,
    private apiItemService: ApiItemService,
    private apiCategoryService: ApiCategoryService,
    public userApi: ApiUserService,
    private modal: ModalsService,
    private router: Router
  ) {}
  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((paramMap) => {
        const id: string | null = paramMap.get('id');
        if (!id) {
          return;
        }

        this.formArray.reset([]);
        this.productId = parseInt(id, 10);
        this.fetchProduct();
        this.ownSetCategories = [];
        this.initOwnSetCategories();
        this.initOtherProducts();
      });
    this.userApi.userFavoriteS
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.favoriteList = resp;
      });
  }
  ngAfterViewInit(): void {}

  public openDescription() {
    this.accordionViews = !this.accordionViews;
  }
  public ngOnDestroy(): void {
    this.destroyed$.next({});
    this.destroyed$.complete();
  }

  private fetchProduct(): void {
    if (!this.productId) {
      return;
    }

    this.apiItemService.getItem(this.productId).subscribe(
      (product: any) => {
        this.product = product;
        this.productImages = [];
        this.productImages.push(this.product.coverImage);
        for (let k in this.product.additionalImages) {
          this.productImages.push(this.product.additionalImages[k]);
        }

        product.specifications.forEach((spec: any) => {
          if (spec.selectType === 'STATIC') {
            return;
          }

          let formGroup: any;
          if (spec.selectType === 'SELECTING') {
            formGroup = new FormGroup({
              specification: new FormControl(spec),
              value: new FormControl(spec.values[0]),
            });
          } else if (spec.selectType === 'DROPDOWN') {
            formGroup = new FormGroup({
              specification: new FormControl(spec),
              value: new FormControl(spec.values[0]),
            });
          } else if (spec.selectType == 'CHECKBOX') {
            formGroup = new FormGroup({
              specification: new FormControl(spec),
              value: new FormControl(spec.values[0]),
            });
          }

          this.formArray.push(formGroup);

          formGroup.valueChanges.subscribe((v: any) => {
            setTimeout(() => {
              this.apiItemService
                .getItemDetails(
                  this.productId as number,
                  this.formArray.value.map((spec: any) => spec.value.id)
                )
                .subscribe((v) => {
                  this.product = { ...this.product, price: v.price };
                });
            }, 10);
          });
        });

        this.apiItemService
          .getItemDetails(
            this.productId as number,
            this.formArray.value.map((spec: any) => spec.value.id)
          )
          .subscribe((v) => {
            this.product.price = v.price;
          });
      },
      (error) => {
        this.router.navigate(['/catalog/']);
        this.modal.showError('Данного товара нет в наличии');
      }
    );
  }

  public onAddToCartClick(): void {
    this.generalService.addProduct({
      product: this.product,
      appliedSpecs: this.formArray.controls.map((v: any) => v.value.value),
    });
  }

  private initOwnSetCategories(): void {
    this.apiCategoryService
      .listCategories()
      .pipe(
        mergeMap((categories) => {
          let data = {};
          categories.slice(1, 5).forEach((category: any) => {
            this.ownSetCategories.push({ category: category });
            Object.assign(data, {
              [category.id]: this.apiCategoryService.getCategory(category.id),
            });
          });
          return forkJoin(data);
        })
      )
      .subscribe((data) => {
        Object.entries(data).forEach((dataEntry) => {
          let category = this.ownSetCategories.find(
            (c) => c.category.id == parseInt(dataEntry[0], 10)
          );
          category.items = (dataEntry[1] as any).items.map((item: any) => ({
            product: item,
            amount: 0,
            appliedSpecs: [],
          }));
        });
        this.selectedOwnSetCategory = this.ownSetCategories[0];
        this.updateScript();
      });
  }

  public onOwnSetProductAmountChange(product: any, type: 'add' | 'pop'): void {
    if (type === 'add') {
      product.amount += 1;
      this.generalService.addProduct(product);
    } else if (product.amount > 0) {
      product.amount -= 1;
      this.generalService.deleteProduct(product);
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
  updateScript() {
    const scriptOld = document.querySelector('[src="assets/main.js"]');
    if (scriptOld) {
      document.body.removeChild(scriptOld);
    }
    const script = document.createElement('script');
    script.src = 'assets/main.js';
    document.body.appendChild(script);
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
  openDropdown(elem: any) {
    const dropDown = elem.closest('.dropdown');
    const dropDownBtn = elem;
    const dropDownIcon = dropDown.querySelector('.dropdown__icon');
    const dropDownList = dropDown.querySelector('.dropdown__list');
    dropDownList.classList.toggle('dropdown__list--visible');
    dropDownIcon.classList.toggle('dropdown__icon--active');
    dropDownBtn.classList.add('dropdown__button--active');
    if (dropDownList.classList.contains('dropdown__list--visible')) {
      dropDownList.style.maxHeight = dropDownList.scrollHeight + 'px';
    } else {
      dropDownList.style.maxHeight = null;
    }
  }
}
