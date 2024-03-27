import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiCategoryService } from 'src/app/core';
import { ProdCategoryService } from 'src/app/core/services/prod-category.service';
import { ICategory } from 'src/app/interfaces/product-interface';

@Component({
  selector: 'app-child-category',
  templateUrl: './child-category.component.html',
  styleUrls: ['./child-category.component.css'],
})
export class ChildCategoryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public categories: ICategory = {} as ICategory;
  public id: number = 0;
  constructor(
    private categoryApi: ApiCategoryService,
    private cdr: ChangeDetectorRef,
    public prodCategory: ProdCategoryService,
    public activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => (this.id = Number(resp.get('id'))));
    this.categoryApi
      .getCategory(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.categories = resp;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
