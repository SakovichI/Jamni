import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {IProduct} from "../../../interfaces/product-interface";
import {ApiCategoryService} from "../../../core";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()
  public category: IProduct[] = []
  public category$: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([])

  constructor(private categoryApi: ApiCategoryService) {
  }

  ngOnInit(): void {
    this.categoryApi.getCategory(2).pipe(takeUntil(this.destroy$)).subscribe(
      (el) => {
        this.category$.next(el.items)
      }
    )
    this.category$.subscribe((res)=> this.category = res)

  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
