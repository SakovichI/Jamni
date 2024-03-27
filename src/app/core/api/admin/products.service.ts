import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IFillProduct,
  IProduct,
  IProductSpec,
} from 'src/app/interfaces/product-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllSpecifications(): Observable<IProductSpec> {
    return this.http.get<IProductSpec>(
      `${this.url}/admin/items/specifications`
    );
  }
  getAllProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/admin/items`);
  }
  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/admin/items/${id}`);
  }

  editProduct(data: FormData): Observable<void> {
    return this.http.put<void>(`${this.url}/admin/items/edit`, data);
  }

  editFillProduct(data: IFillProduct): Observable<void> {
    return this.http.put<void>(`${this.url}/admin/items/fill`, data);
  }

  createProduct(data: IProduct): Observable<void> {
    return this.http.post<void>(`${this.url}/admin/items/create`, data);
  }
}
