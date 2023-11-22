import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class ApiNewsService{
  private apiUrl: string = environment.apiUrl + '/news/';
  constructor(private httpClient: HttpClient) {
  }

  public listNews(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}`);
  }

  public getNews(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}` + id);
  }
}
