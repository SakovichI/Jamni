import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ApiUserService } from 'src/app/core/api/api-user.service';
import { LoaderService } from 'src/app/core/services/loader.service';
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

  constructor(private userApi: ApiUserService, private loader: LoaderService) {}

  ngOnInit(): void {
    this.loader.loaded = true;
    this.userApi
      .getFavorites()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.category$.next(resp);
        this.category$.subscribe((resp) => (this.category = resp));
        this.loader.loaded = false;
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
