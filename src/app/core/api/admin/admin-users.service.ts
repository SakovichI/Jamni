import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserBalance, IUsers } from 'src/app/interfaces/users-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  private url = environment.apiUrl;
  public userS: BehaviorSubject<IUsers> = new BehaviorSubject({} as IUsers);
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(`${this.url}/admin/user`);
  }
  getUser(id: number): Observable<IUsers> {
    return this.http.get<IUsers>(`${this.url}/admin/user/${id}`);
  }

  getUserBalance(id: number): Observable<IUserBalance> {
    return this.http.get<IUserBalance>(`${this.url}/admin/user/balance/${id}`);
  }

  editUser(data: IUsers): Observable<void> {
    return this.http.put<void>(`${this.url}/admin/user/edit`, data);
  }
  editUserBalance(data: { id: number; diffBalance: number }): Observable<void> {
    return this.http.put<void>(`${this.url}/admin/user/balance/edit`, data);
  }
}
