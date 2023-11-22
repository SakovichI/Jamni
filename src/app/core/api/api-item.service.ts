import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class ApiItemService{
  private apiUrl: string = environment.apiUrl + '/item';
  constructor(private httpClient: HttpClient) {
  }

  public listItems(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}`);
  }

  public getItem(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }

  public getItemDetails(id: number, specValueIds: number[]): Observable<any> {
    let params = new HttpParams();
    specValueIds.forEach((id) => {
      params = params.append('specValueIds', id.toString());
    });
    return this.httpClient.get(`${this.apiUrl}/${id}/detailed`, {params});
  }
}
