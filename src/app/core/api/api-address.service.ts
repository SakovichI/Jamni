import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { IAddress } from 'src/app/interfaces/address-inteface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiAddressService {
  private url = environment.apiUrl;
  public address$: BehaviorSubject<IAddress[]> = new BehaviorSubject<
    IAddress[]
  >([]);
  constructor(private http: HttpClient) {}

  getAddress(): Observable<IAddress[]> {
    return this.http
      .get<IAddress[]>(`${this.url}/users/addresses`)
      .pipe(tap((resp) => this.address$.next(resp)));
  }

  addAddress(data: IAddress): Observable<IAddress[]> {
    return this.http
      .post<IAddress[]>(`${this.url}/users/addresses`, data)
      .pipe(switchMap(() => this.getAddress()));
  }
  addAddressNoName(data: IAddress): Observable<IAddress[]> {
    return this.http.post<IAddress[]>(`${this.url}/addresses`, data);
  }

  editAddress(data: IAddress, id: number): Observable<IAddress[]> {
    return this.http.put<IAddress[]>(`${this.url}/users/addresses/${id}`, data);
  }
  deleteAddress(id: number): Observable<IAddress[]> {
    return this.http.delete<IAddress[]>(`${this.url}/users/addresses/${id}`);
  }

  getAddressId(id: number): Observable<IAddress> {
    return this.http.get<IAddress>(`${this.url}/admin/addresses/${id}`);
  }
}
