import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class ApiOrderService{
  private apiUrl: string = environment.apiUrl + '/order/';
  constructor(private httpClient: HttpClient) {
  }

  public makeOrder(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}`, data);
  }
}
