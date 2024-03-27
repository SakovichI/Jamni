import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiItemService {
  private apiUrl: string = environment.apiUrl + '/item';
  constructor(private httpClient: HttpClient) {}

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

    return this.httpClient.get(`${this.apiUrl}/${id}/detailed`, { params });
  }
}
