import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ApiUserService } from 'src/app/core/api/api-user.service';
import { IUserFavorites } from 'src/app/interfaces/users-interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public category: IUserFavorites[] = [];
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
  favorites(id: number) {
    let data = { itemId: id, enabled: true };
    if (this.category.filter((el) => el.id === id).length > 0) {
      data = { itemId: id, enabled: false };
    } else {
      data = { itemId: id, enabled: true };
    }
    this.userApi
      .editFavorites(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.category = resp;
      });
  }
}
