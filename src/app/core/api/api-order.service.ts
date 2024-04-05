import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder, IPayment } from 'src/app/interfaces/orders-payments';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiOrderService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
  public orderPay(data: IPayment): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/order/payment`, data);
  }

  public makeOrder(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/users/order`, data);
  }

  getPostParams(): Observable<any> {
    return this.httpClient.get<any>('https://jamni.sakovichi.online/');
  }

  public makeOrderNoName(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/order/without-user`, data);
  }

  public getOrders(): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>(`${this.apiUrl}/users/order`);
  }

  public adminGetOrder(): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>(`${this.apiUrl}/admin/order`);
  }

  public adminEditOrder(
    id: number,
    data: { status: 'NEW' | 'CANCELED' | 'PAID' | 'WAITING' | 'ERROR' }
  ): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/admin/order/${id}`, data);
  }
  public adminDeleteOrder(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/admin/order/${id}`);
  }

  getOrderItem(
    id: number
  ): Observable<'NEW' | 'CANCELED' | 'PAID' | 'WAITING' | 'ERROR'> {
    return this.httpClient.get<
      'NEW' | 'CANCELED' | 'PAID' | 'WAITING' | 'ERROR'
    >(`${this.apiUrl}/order/order/${id}`);
  }
}
