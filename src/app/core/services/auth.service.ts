import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IUsers } from 'src/app/interfaces/users-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;
  public isLoggedIn: boolean = false;
  constructor(private http: HttpClient, private route: Router) {}

  login(value: {
    email: string;
    password: string;
  }): Observable<{ jwt: string }> {
    return this.http
      .post<{ jwt: string }>(`${this.url}/auth/signin`, value)
      .pipe(
        tap((token) => {
          this.setToken(token.jwt);
        })
      );
  }
  registrationClient(user: IUsers): Observable<{ jwt: string }> {
    return this.http.post<{ jwt: string }>(
      `${this.url}/auth/signup/client`,
      user
    );
  }
  registrationDesigner(user: IUsers): Observable<{ jwt: string }> {
    return this.http.post<{ jwt: string }>(
      `${this.url}/auth/signup/designer`,
      user
    );
  }
  registrationWholesaler(user: IUsers): Observable<{ jwt: string }> {
    return this.http.post<{ jwt: string }>(
      `${this.url}/auth/signup/wholesaler`,
      user
    );
  }

  recovery(value: { email: string }): Observable<void> {
    return this.http.post<void>(`${this.url}/auth/recovery`, value);
  }
  recoveryFinish(value: {
    email: string;
    code: string;
    password: string;
  }): Observable<{ jwt: string }> {
    return this.http.post<{ jwt: string }>(
      `${this.url}/auth/recovery/finish`,
      value
    );
  }

  logout() {
    this.clearLocalStorage();
    this.route.navigate(['../']);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
