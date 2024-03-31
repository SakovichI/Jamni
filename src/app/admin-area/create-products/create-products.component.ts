import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subject, concatMap, forkJoin, map, takeUntil } from 'rxjs';
import { ApiCategoryService } from 'src/app/core';
import { ProductsService } from 'src/app/core/api/admin/products.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ProdCategoryService } from 'src/app/core/services/prod-category.service';
import { ICategory, IProduct } from 'src/app/interfaces/product-interface';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css'],
})
export class CreateProductsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private destroy$ = new Subject<void>();
  public id: number = 0;
  public product: IProduct = {
    name: '',
    coverImage: '',
    additionalImages: [],
    descriptions: [],
    specifications: [],
  };
  public categoryThisProd: ICategory = {} as ICategory;
  public activeCategory: string = '';
  public category: ICategory[] = [];
  public childCategory: any[] = [];
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
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    image: new FormControl(''),
    loadAdditionalImages: new FormControl(''),
    enabled: new FormControl(false),
  });

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
    private adminProd: ProductsService,
    private categoryApi: ApiCategoryService,
    private loader: LoaderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loader.loaded = true;
    this.getCategoryList();
    this.updateScript();
  }
  ngAfterViewInit(): void {}
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
      name: new FormControl(product.name, Validators.required),
      category: new FormControl(this.categoryThisProd.id, Validators.required),
      image: new FormControl(''),
      loadAdditionalImages: new FormControl(''),
      enabled: new FormControl(this.enabled),
    });
  }
  submitMain(form: FormGroup) {
    this.loader.loaded = true;
    const data = new FormData();
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
      .createProduct(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: IProduct) => {
        this.loader.loaded = false;
        this.router.navigate([
          `./admin/category/${form.value.category}/product/${resp.id}`,
        ]);
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
        this.loader.loaded = false;
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
    this.displayCustom = true;
  }

  selectCategory(category: ICategory) {
    this.activeCategory = category.name;
    this.mainForm.controls['category'].setValue(category.id);
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
}
