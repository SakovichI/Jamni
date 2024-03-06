import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ApiUserService } from 'src/app/core/api/api-user.service';
import { IUserFavorites } from 'src/app/interfaces/users-interface';
import { IProduct } from '../../../interfaces/product-interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public category: IProduct[] = [];
  public category$: BehaviorSubject<IUserFavorites[]> = new BehaviorSubject<
    IUserFavorites[]
  >([]);

  constructor(private userApi: ApiUserService) {}

  ngOnInit(): void {
    this.userApi
      .getFavorites()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.category$.next(resp);
        this.category$.subscribe((resp) => (this.category = resp));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
