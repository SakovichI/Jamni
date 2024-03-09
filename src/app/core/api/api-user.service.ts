import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { IUserFavorites, IUsers } from 'src/app/interfaces/users-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  private url = environment.apiUrl;
  public userS: BehaviorSubject<IUsers> = new BehaviorSubject({} as IUsers);
  public userFavoriteS: BehaviorSubject<IUserFavorites[]> = new BehaviorSubject(
    [] as IUserFavorites[]
  );

  constructor(private http: HttpClient) {}

  getUser(): Observable<IUsers> {
    return this.http
      .get<IUsers>(`${this.url}/users`)
      .pipe(tap((res) => this.userS.next(res)));
  }

  editUser(user: IUsers): Observable<IUsers> {
    return this.http.put<IUsers>(`${this.url}/users/edit`, user);
  }

  getFavorites(): Observable<IUserFavorites[]> {
    return this.http
      .get<IUserFavorites[]>(`${this.url}/users/favorite`)
      .pipe(tap((resp) => this.userFavoriteS.next(resp)));
  }

  editFavorites(data: {
    itemId: number;
    enabled: boolean;
  }): Observable<IUserFavorites[]> {
    return this.http
      .put(`${this.url}/users/favorite/edit`, data)
      .pipe(switchMap(() => this.getFavorites()));
  }
}
