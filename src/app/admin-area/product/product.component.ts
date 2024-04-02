import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subject, concatMap, forkJoin, map, takeUntil } from 'rxjs';
import { ApiCategoryService, ApiItemService } from 'src/app/core';
import { ProductsService } from 'src/app/core/api/admin/products.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import { ProdCategoryService } from 'src/app/core/services/prod-category.service';
import {
  ICategory,
  IFillProduct,
  IProduct,
  IProductSpec,
  TDetailProduct,
  TSpecValue,
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
  public product: IProduct = {} as IProduct;
  public allSpecifications: IProductSpec[] = [];
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
  displayCustom: boolean = false;

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
  public detailFormArr: FormArray = new FormArray([]);

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
  public attributeModal = false;
  public newAttributeFormArr: FormArray = new FormArray([]);
  public allCombination: TSpecValue[][] = [];
  public allCombinationDetail: TDetailProduct[] = [];

  constructor(
    private prodCategory: ProdCategoryService,
    private categoryApi: ApiCategoryService,
    private activeRoute: ActivatedRoute,
    private adminProd: ProductsService,
    private productApi: ApiItemService,
    private router: Router,
    private modal: ModalsService,
    public loader: LoaderService
  ) {}

  ngOnInit() {
    this.loader.loaded = true;
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
        this.allCombination = this.getCrossCombinations(
          this.product.specifications
        );

        this.allCombination.map((el: TSpecValue[]) => {
          el.reverse();
        });
        this.allCombinationDetail = this.getAllDetail(this.allCombination);

        this.product.specifications.forEach((spec: any) => {
          let formGroup: FormGroup;

          formGroup = new FormGroup({
            specification: new FormControl(spec),
            value: new FormControl(spec.values[0]),
          });

          this.formArray.push(formGroup);
        });
        this.loader.loaded = false;
      });
    this.adminProd
      .getAllSpecifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.allSpecifications = resp;
      });
  }
  ngAfterViewInit(): void {
    this.updateScript();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    setTimeout(() => {
      const scriptOld = document.querySelector('[src="assets/main.js"]');
      if (scriptOld) {
        document.body.removeChild(scriptOld);
      }
    }, 20);
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

    this.adminProd
      .editProduct(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loader.loaded = false;
        this.router.navigate(['../../'], { relativeTo: this.activeRoute });
      });
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
        this.product.coverImage = reader.result as string;
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
      this.product.additionalImages = fileArr;
      this.mainForm.controls['loadAdditionalImages'].setValue(files);
    }
    this.updateScript();
  }
  removeImage(index: number) {
    let fileArr = [...this.mainForm.controls['loadAdditionalImages'].value];
    if (this.product.additionalImages.length === 1) {
      this.product.additionalImages = [];
      fileArr = [];
      this.mainForm.controls['loadAdditionalImages'].setValue(fileArr);
    } else {
      this.product.additionalImages.splice(index, 1);
      fileArr.splice(index, 1);
      this.mainForm.controls['loadAdditionalImages'].setValue(fileArr);
    }
    this.updateScript();
  }
  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = !this.displayCustom;
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

    this.detailFormArr.controls.forEach((form) => {
      console.log(form.valid);

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
    this.loader.loaded = true;
    if (this.validForm()) {
      let data: IFillProduct = {
        itemId: 0,
        specValueId: [],
        detailed: [],
        description: [],
      };
      data.itemId = this.id;
      if (this.descFormArr.controls.length > 0) {
        this.descFormArr.controls.forEach((desc: any) => {
          data.description.push(desc.value);
        });
      }
      if (this.product.specifications.length > 0) {
        this.product.specifications.forEach((spec: IProductSpec) => {
          spec.values.forEach((value) => {
            data.specValueId.push(value.id);
          });
        });
        this.detailFormArr.controls.forEach((form) => {
          let detail: TDetailProduct = {
            specValueIds: (form as FormGroup).controls['specValueIds'].value,
            price: (form as FormGroup).controls['price'].value,
          };
          data.detailed.push(detail);
        });
      } else {
        data.detailed.push({
          specValueIds: [],
          price: this.mainForm.value.price,
        });
      }

      this.adminProd
        .editFillProduct(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.submitMain(this.mainForm);
        });
    } else {
      this.modal.showError('Заполните все поля');
    }
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
  getCrossCombinations(objects: IProductSpec[]): TSpecValue[][] {
    // Базовый случай: если массив пуст, возвращаем массив с пустым массивом
    if (objects.length === 0) {
      return [[]];
    }

    // Получаем первый объект из массива
    const [currentObject, ...restObjects] = objects;

    // Рекурсивно получаем перекрестные комбинации для оставшихся объектов
    const restCombinations: any = this.getCrossCombinations(restObjects);

    // Создаем массив для хранения всех комбинаций
    const combinations = [];

    // Для каждой комбинации из оставшихся объектов
    for (const combination of restCombinations) {
      // Для каждого значения текущего объекта
      for (const value of currentObject.values) {
        // Проверяем, что значение не повторяется в текущей комбинации
        if (!combination.map((obj: any) => obj.id).includes(value.id)) {
          // Добавляем комбинацию с добавленным значением
          combinations.push([...combination, value]);
        }
      }
    }

    return combinations;
  }

  getAllDetail(allCombination: TSpecValue[][]) {
    const detailArr: TDetailProduct[] = [];
    let form: FormGroup;
    this.detailFormArr.controls = [];

    if (allCombination.length > 1) {
      allCombination.forEach((comb: TSpecValue[]) => {
        const detail: TDetailProduct = {
          specValue: [],
          specValueIds: [],
          price: 0,
        };

        comb.forEach((el) => {
          detail.specValueIds.push(el.id);
          detail.specValue?.push(el);
        });

        this.productApi
          .getItemDetails(this.id, detail.specValueIds)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (resp) => {
              detail.price = resp.price;
              detailArr.push(detail);
              form = new FormGroup({
                specValue: new FormControl(detail.specValue),
                specValueIds: new FormControl(detail.specValueIds),
                price: new FormControl(detail.price, [
                  Validators.required,
                  Validators.min(100),
                ]),
              });
              this.detailFormArr.push(form);
            },
            (error) => {
              if (error.status === 500) {
                detail.price = 0;
                detailArr.push(detail);
                form = new FormGroup({
                  specValue: new FormControl(detail.specValue),
                  specValueIds: new FormControl(detail.specValueIds),
                  price: new FormControl(detail.price, [
                    Validators.required,
                    Validators.min(100),
                  ]),
                });
                this.detailFormArr.push(form);
              }
            }
          );
      });
    }
    return detailArr;
  }

  showAttributeModal() {
    this.attributeModal = !this.attributeModal;

    this.newAttributeFormArr.controls = [];
    if (this.product.specifications.length > 0) {
      this.allSpecifications.forEach((spec: IProductSpec) => {
        let specValue: TSpecValue[] = [];
        this.product.specifications.forEach((allSpec: IProductSpec) => {
          if (allSpec.id === spec.id) {
            spec.values.forEach((mainSpecValue) => {
              allSpec.values.forEach((value) => {
                if (mainSpecValue.id === value.id) {
                  mainSpecValue.enabled = true;
                }
              });
              specValue.push(mainSpecValue);
            });
            let form = new FormGroup({
              specification: new FormControl(spec),
              values: new FormControl(specValue),
            });
            this.newAttributeFormArr.controls.push(form);
          }
        });
      });
    }
    this.updateScript();
  }
  addAttribute(spec: IProductSpec) {
    let controlArr: number[] = [];
    this.newAttributeFormArr.controls.forEach((form) => {
      controlArr.push((form as FormGroup).controls['specification'].value.id);
    });
    if (controlArr.indexOf(spec.id) == -1) {
      spec.values.forEach((value) => {
        value.enabled = false;
      });
      let form = new FormGroup({
        specification: new FormControl(spec),
        values: new FormControl(spec.values),
      });
      this.newAttributeFormArr.controls.push(form);
    }
  }
  removeNewAttribute(id: number) {
    this.newAttributeFormArr.controls =
      this.newAttributeFormArr.controls.filter(
        (form) => id !== (form as FormGroup).controls['specification'].value.id
      );
    this.removeAttribute(id);
  }

  saveAttribute() {
    let formGroup: FormGroup;
    this.product.specifications = [];
    this.formArray.controls = [];
    this.newAttributeFormArr.controls.forEach((form) => {
      let newSpec = (form as FormGroup).controls['specification'].value;
      let specValue: TSpecValue[] = [];
      (form as FormGroup).controls['values'].value.forEach(
        (value: TSpecValue) => {
          if (value.enabled) {
            specValue.push(value);
          }
        }
      );
      newSpec.values = specValue;
      this.product.specifications.push(newSpec);
    });
    this.product.specifications.forEach((spec: any) => {
      let formGroup: FormGroup;

      formGroup = new FormGroup({
        specification: new FormControl(spec),
        value: new FormControl(spec.values),
      });

      this.formArray.controls.push(formGroup);
    });
    this.allCombination = this.getCrossCombinations(
      this.product.specifications
    );
    this.allCombination.map((el: TSpecValue[]) => {
      el.reverse();
    });
    this.allCombinationDetail = this.getAllDetail(this.allCombination);
    this.adminProd
      .getAllSpecifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.allSpecifications = resp;
      });
    this.showAttributeModal();
  }

  removeAttribute(id: number) {
    this.formArray.controls = this.formArray.controls.filter(
      (form) => (form as FormGroup).controls['specification'].value.id !== id
    );
    this.product.specifications = this.product.specifications.filter(
      (spec: IProductSpec) => spec.id !== id
    );
    this.allCombination = this.getCrossCombinations(
      this.product.specifications
    );
    this.allCombination.map((el: TSpecValue[]) => {
      el.reverse();
    });
    this.allCombinationDetail = this.getAllDetail(this.allCombination);

    this.updateScript();
  }
}
