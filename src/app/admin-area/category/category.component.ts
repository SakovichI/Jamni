import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiCategoryService } from 'src/app/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ProdCategoryService } from 'src/app/core/services/prod-category.service';
import { ICategory } from 'src/app/interfaces/product-interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public categories: ICategory[] = [];
  constructor(
    private categoryApi: ApiCategoryService,
    private cdr: ChangeDetectorRef,
    public prodCategory: ProdCategoryService,
    public loader: LoaderService
  ) {}

  ngOnInit() {
    this.loader.loaded = true;
    this.categoryApi
      .listCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.categories = resp;
        this.loader.loaded = false;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
