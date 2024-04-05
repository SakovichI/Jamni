import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ApiCategoryService } from 'src/app/core';
import { ProductsService } from 'src/app/core/api/admin/products.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ICategory, IProduct } from 'src/app/interfaces/product-interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @Input() categoryId = 0;
  public category: ICategory = {} as ICategory;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private categoryApi: ApiCategoryService,
    private adminProd: ProductsService,
    public loader: LoaderService
  ) {}

  ngOnInit() {
    this.loader.loaded = true;
    this.activeRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => (this.categoryId = Number(resp.get('id'))));

    this.categoryApi
      .getCategory(this.categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.category = resp;
        this.loader.loaded = false;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  deleteProduct(product: IProduct) {
    const productData = new FormData();
    productData.append('id', JSON.stringify(product.id));
    productData.append('enabled', JSON.stringify(!product.enabled));

    this.adminProd
      .editProduct(productData)
      .pipe(
        switchMap(() => this.categoryApi.getCategory(this.categoryId)),
        tap((resp) => (this.category = resp)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  bacNav() {
    if (this.category.parentCategoryId) {
      this.router.navigate([
        `/admin/childCategory/${this.category.parentCategoryId}`,
      ]);
    } else {
      this.router.navigate(['../'], { relativeTo: this.activeRoute });
    }
  }
}
