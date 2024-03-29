import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ApiCategoryService } from 'src/app/core';
import { ProductsService } from 'src/app/core/api/admin/products.service';
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
    private categoryApi: ApiCategoryService,
    private adminProd: ProductsService
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => (this.categoryId = Number(resp.get('id'))));

    this.categoryApi
      .getCategory(this.categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.category = resp;
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
}
