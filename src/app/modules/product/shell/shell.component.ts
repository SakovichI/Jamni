import {AfterViewInit, Component, OnDestroy, OnInit, Output} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {forkJoin, mergeMap, Subject, takeUntil} from "rxjs";
import {GeneralService} from "../../../core/services/general.service";
import {ApiCategoryService, ApiItemService} from "../../../core";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnDestroy, OnInit {
  private destroyed$: Subject<any> = new Subject<any>();
  public productId?: number;
  public product: any;
  public formArray: FormArray = new FormArray([]);
  public ownSetCategories: any[] = [];
  public selectedOwnSetCategory: any;
  public otherProducts: any[] = [];
  public accordionViews: boolean = false;
  private lastScript: any;

  public productImages: string[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              public generalService: GeneralService,
              private apiItemService: ApiItemService,
              private apiCategoryService: ApiCategoryService) {
    this.activatedRoute.paramMap.pipe(takeUntil(this.destroyed$)).subscribe((paramMap) => {
      const id: string | null = paramMap.get('id');
      if (!id) {
        return;
      }

      setTimeout(()=>{
        const scripts:Element | null = document.querySelector('script[src="assets/main.js"]');
        if (scripts){
          document.body.removeChild(scripts)
        }
        const script = document.createElement('script');
        script.src = 'assets/main.js';
        document.body.appendChild(script)
      }, 500)
      this.formArray.reset([]);
      this.productId = parseInt(id, 10);
      this.fetchProduct();
      this.ownSetCategories=[]
      this.initOwnSetCategories();
      this.initOtherProducts();
    });
  }
  ngOnInit() {
  }

  public openDescription() {
    this.accordionViews = !this.accordionViews
  }
  public ngOnDestroy(): void {
    this.destroyed$.next({});
    this.destroyed$.complete();
  }


  private fetchProduct(): void {
    if (!this.productId) {
      return;
    }

    this.apiItemService.getItem(this.productId).subscribe((product: any) => {
      console.log(product)
      this.product = product;

      product.specifications.forEach((spec: any) => {
        if (spec.selectType === 'STATIC') {
          return;
        }

        let formGroup: any;
        if (spec.selectType === 'SELECTING') {
          formGroup = new FormGroup({
            specification: new FormControl(spec),
            value: new FormControl(spec.values[0])
          })
        } else if (spec.selectType === 'DROPDOWN') {
          formGroup = new FormGroup({
            specification: new FormControl(spec),
            value: new FormControl(spec.values[0])
          })
        } else if (spec.selectType == 'CHECKBOX') {
          formGroup = new FormGroup({
            specification: new FormControl(spec),
            value: new FormControl(spec.values[0])
          })
        }

        this.formArray.push(formGroup);

        formGroup.valueChanges.subscribe((v: any) => {
          setTimeout(() => {
            this.apiItemService.getItemDetails(this.productId as number, this.formArray.value.map((spec: any) => spec.value.id)).subscribe((v) => {
              this.product = {...this.product, price: v.price};
              this.productImages = v.images.length ? v.images : ['assets/img/no-img-placeholder.svg'];
            })
          }, 10)
        })
      });

      this.apiItemService.getItemDetails(this.productId as number, this.formArray.value.map((spec: any) => spec.value.id)).subscribe((v) => {
        this.product.price = v.price;
        this.productImages = v.images.length ? v.images : ['assets/img/no-img-placeholder.svg'];
      })
    })
  }

  public onAddToCartClick(): void {
    this.generalService.addProduct({
      product: this.product,
      appliedSpecs: this.formArray.value.map((v: any) => v.value.id)
    })
  }

  private initOwnSetCategories(): void {
    this.apiCategoryService.listCategories().pipe(
      mergeMap((categories) => {
        let data = {};
        categories.slice(1, 5).forEach((category: any) => {
          this.ownSetCategories.push({category: category});
          Object.assign(data, {[category.id]: this.apiCategoryService.getCategory(category.id)})
        })
        return forkJoin(data)
      })
    ).subscribe((data) => {
      Object.entries(data).forEach((dataEntry) => {
        let category = this.ownSetCategories.find((c) => c.category.id == parseInt(dataEntry[0], 10));
        category.items = (dataEntry[1] as any).items.map((item: any) => ({product: item, amount: 0, appliedSpecs: []}));
      });
      this.selectedOwnSetCategory = this.ownSetCategories[0];
    })
  }

  public onOwnSetProductAmountChange(product: any, type: 'add' | 'pop'): void {
    if (type === 'add') {
      product.amount += 1;
      this.generalService.addProduct(product)
    } else if (product.amount > 0) {
      product.amount -= 1;
      this.generalService.deleteProduct(product);
    }
  }

  private initOtherProducts(): void {
    this.apiItemService.listItems().subscribe((items) => {
      this.otherProducts = items.slice(0, 10);
    })
  }

}
