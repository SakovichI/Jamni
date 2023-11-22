import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiFeedbackService {
  private apiUrl: string = environment.apiUrl + '/feedback/';

  constructor(private httpClient: HttpClient) {
  }

  public makeFeedback(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}`, data);
  }
}
