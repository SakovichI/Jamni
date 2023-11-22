import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {filter, Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class ApiCategoryService {
  private apiUrl: string = environment.apiUrl + '/category';

  constructor(private httpClient: HttpClient) {
  }

  public listCategories(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/`);
  }

  public getCategory(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }

  public getCategoryChildren(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}/children`);
  }

  public getFilter(id: number, params:any): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`, {params});
  }
}
