import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUsers } from 'src/app/interfaces/users-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  private url = environment.apiUrl;
  public userS: BehaviorSubject<IUsers> = new BehaviorSubject({} as IUsers);

  constructor(private http: HttpClient) {}

  getUser(): Observable<IUsers> {
    return this.http
      .get<IUsers>(`${this.url}/users`)
      .pipe(tap((res) => this.userS.next(res)));
  }
}
