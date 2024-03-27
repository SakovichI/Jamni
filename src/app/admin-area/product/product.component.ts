import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subject, concatMap, forkJoin, map, takeUntil } from 'rxjs';
import { ApiCategoryService, ApiItemService } from 'src/app/core';
import { ProductsService } from 'src/app/core/api/admin/products.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import { ProdCategoryService } from 'src/app/core/services/prod-category.service';
import {
  ICategory,
  IFillProduct,
  IProduct,
} from 'src/app/interfaces/product-interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private id = 0;
  private categoryId = 0;
  public categoryThisProd: ICategory = {} as ICategory;
  public activeCategory: string = '';
  public category: ICategory[] = [];
  public childCategory: any[] = [];
  public product: any = {};
  private enabled: boolean = true;
  //Gallery
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  displayCustom!: boolean;

  activeIndex: number = 0;

  public mainForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    loadAdditionalImages: new FormControl(''),
    enabled: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(100)]),
  });
  public formArray: FormArray = new FormArray([]);
  public descFormArr: FormArray = new FormArray([]);
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '250px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Заполните поле...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [],
    customClasses: [],
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    outline: false,
    toolbarHiddenButtons: [
      ['underline', 'strikeThrough', 'subscript', 'superscript', 'fontName'],
      ['fontSize', 'toggleEditorMode', 'customClasses'],
    ],
  };
  constructor(
    private prodCategory: ProdCategoryService,
    private categoryApi: ApiCategoryService,
    private cdr: ChangeDetectorRef,
    private activeRoute: ActivatedRoute,
    private adminProd: ProductsService,
    private productApi: ApiItemService,
    private router: Router,
    private modal: ModalsService
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.id = Number(resp.get('id'));
      });
    this.adminProd
      .getAllProduct()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.enabled = resp.filter((el) => el.id === this.id)[0]
          .enabled as boolean;
      });
    this.adminProd
      .getProduct(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.product = resp;
        this.getCategoryList();
        let formGroup!: FormGroup;
        this.product.descriptions.forEach((desItem: any) => {
          formGroup = new FormGroup({
            name: new FormControl(desItem.name, Validators.required),
            descriptionHtml: new FormControl(
              desItem.descriptionHtml,
              Validators.required
            ),
          });

          this.descFormArr.push(formGroup);
        });
        this.product.specifications.forEach((spec: any) => {
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
        });
      });
    this.adminProd
      .getAllSpecifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {});
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const scriptOld = document.querySelector('[src="assets/main.js"]');
      if (scriptOld) {
        document.body.removeChild(scriptOld);
      }
    }, 50);
    setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'assets/main.js';
      document.body.appendChild(script);
    }, 100);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateMainForm(product: IProduct) {
    this.categoryThisProd = this.category.filter(
      (cat) => cat.id === this.prodCategory.getProdCategory()
    )[0];

    if (this.categoryThisProd) {
      this.activeCategory = this.categoryThisProd.name;
    }
    if (!this.categoryThisProd) {
      this.categoryThisProd = this.childCategory.filter(
        (cat) => cat.id === this.prodCategory.getProdCategory()
      )[0];
      this.activeCategory = this.categoryThisProd.name;
    }
    this.mainForm = new FormGroup({
      id: new FormControl(product.id, Validators.required),
      name: new FormControl(product.name, Validators.required),
      category: new FormControl(this.categoryThisProd.id, Validators.required),
      image: new FormControl(null),
      loadAdditionalImages: new FormControl(null),
      enabled: new FormControl(this.enabled),
      price: new FormControl(this.product.price, [
        Validators.required,
        Validators.min(100),
      ]),
    });
  }
  submitMain(form: FormGroup) {
    const data = new FormData();
    data.append('id', this.id.toString());
    data.append('name', form.value.name);
    data.append('categoryId', form.value.category);
    if (form.value.image) {
      data.append('image', form.value.image);
    }
    if (form.value.loadAdditionalImages) {
      [...form.value.loadAdditionalImages].forEach((file: any) => {
        data.append('loadAdditionalImages', file);
      });
    }

    data.append('enabled', form.value.enabled);

    this.adminProd.editProduct(data).pipe(takeUntil(this.destroy$)).subscribe();
  }

  getCategoryList() {
    this.categoryApi
      .listCategories()
      .pipe(
        map((resp) => {
          const childCategory: number[] = [];
          this.category = resp.sort(
            (a: ICategory, b: ICategory) =>
              b.childCategoryIds.length - a.childCategoryIds.length
          );
          this.category.forEach((category: ICategory) => {
            category.childCategoryIds.forEach((el) => childCategory.push(el));
          });
          return childCategory;
        }),
        concatMap((childCategory) => {
          this.childCategory = childCategory.map((id: number) =>
            this.categoryApi.getCategory(id)
          );
          return forkJoin(this.childCategory);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((resp) => {
        this.childCategory = resp;
        this.category.forEach((category: ICategory) => {
          if (category.childCategoryIds.length > 0) {
            category.childCategoryIds = [];
            this.childCategory.forEach((cat: ICategory) => {
              if (cat.parentCategoryId === category.id) {
                category.childCategoryIds.push(cat);
              }
            });
          } else {
            return;
          }
        });
        this.updateMainForm(this.product);
      });
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.product.coverImage = reader.result;
      };
      reader.readAsDataURL(file);
      this.mainForm.controls['image'].setValue(file);
    }
  }
  onFilesSelected(event: any): void {
    const files = event.target.files;
    const fileArr: string[] = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          fileArr.push(reader.result as string);
        };
        reader.readAsDataURL(files[i]);
      }
      this.product.loadAdditionalImages = fileArr;
      this.mainForm.controls['loadAdditionalImages'].setValue(files);
    }
  }
  removeImage(index: number) {
    let fileArr = [...this.mainForm.controls['loadAdditionalImages'].value];
    if (this.product.loadAdditionalImages.length === 1) {
      this.product.loadAdditionalImages = [];
      fileArr = [];
      this.mainForm.controls['loadAdditionalImages'].setValue(fileArr);
    } else {
      this.product.loadAdditionalImages.splice(index, 1);
      fileArr.splice(index, 1);
      this.mainForm.controls['loadAdditionalImages'].setValue(fileArr);
    }
  }
  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  selectCategory(category: ICategory) {
    this.activeCategory = category.name;
    this.mainForm.controls['category'].setValue(category.id);
  }
  addDescItem() {
    this.descFormArr.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        descriptionHtml: new FormControl('', Validators.required),
      })
    );
  }
  removeDescItem(i: number) {
    this.descFormArr.controls.splice(i, 1);
  }

  validForm(): boolean {
    let booleanArr: boolean[] = [];
    this.descFormArr.controls.forEach((form) => {
      if (form.valid) {
        booleanArr.push(true);
      } else {
        booleanArr.push(false);
      }
    });
    if (this.mainForm.valid) {
      booleanArr.push(true);
    } else {
      booleanArr.push(false);
    }
    if (booleanArr.indexOf(false) != -1) {
      return false;
    } else {
      return true;
    }
  }

  submitFillProduct() {
    if (this.validForm()) {
      let data: IFillProduct = {
        itemId: 0,
        specValueId: [],
        detailed: [
          {
            specValueIds: [],
            price: this.mainForm.value.price,
          },
        ],
        description: [],
      };
      data.itemId = this.id;
      if (this.descFormArr.controls.length > 0) {
        this.descFormArr.controls.forEach((desc: any) => {
          data.description.push(desc.value);
        });
      }
      this.submitMain(this.mainForm);
      this.adminProd
        .editFillProduct(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    } else {
      this.modal.showError('Заполните все поля');
    }
  }
}
