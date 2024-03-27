import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProdCategoryService {
  constructor(private router: Router) {}
  getProdCategory() {
    const categoryId = this.router.url
      .split('/admin/category/')[1]
      .split('/')[0];
    return Number(categoryId);
  }
}
