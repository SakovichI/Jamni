import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  public cart?: ElementRef;
  public selectedItems: any[] = [];
  constructor() {
    let dataFromLocalStorage: string | null = localStorage.getItem('cart');
    if (dataFromLocalStorage) {
      this.selectedItems = JSON.parse(dataFromLocalStorage);
    }
  }

  public addProduct(productToAdd: { product: any; appliedSpecs: any[] }): void {
    let existedProducts: any[] = this.selectedItems.filter(
      (item: any) => item.product.id == productToAdd.product.id
    );

    let sameProduct = existedProducts.find(
      (ep: any) =>
        ep.appliedSpecs.length == productToAdd.appliedSpecs.length &&
        ep.appliedSpecs.every((appliedSpec: number) =>
          productToAdd.appliedSpecs.includes(appliedSpec)
        )
    );

    if (sameProduct) {
      sameProduct.amount += 1;
    } else {
      this.selectedItems.push({
        product: productToAdd.product,
        appliedSpecs: productToAdd.appliedSpecs,
        amount: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(this.selectedItems));
  }

  public deleteProduct(product: any): void {
    const item = this.selectedItems.filter(
      (item: any) => item.product.id == product.product.id
    );

    const item2 = item.find(
      (ep: any) =>
        ep.appliedSpecs.length == product.appliedSpecs.length &&
        (product.appliedSpecs.length === 0 ||
          ep.appliedSpecs.every((appliedSpec: number) =>
            product.appliedSpecs.includes(appliedSpec)
          ))
    );
    if (item2.amount == 1) {
      this.selectedItems.splice(this.selectedItems.indexOf(item[0]), 1);
    } else {
      item2.amount -= 1;
    }

    localStorage.setItem('cart', JSON.stringify(this.selectedItems));
  }

  public getProductsAmount(): number {
    if (this.selectedItems.length) {
      return this.selectedItems
        .map((item) => item.amount)
        .reduce((a, b) => a + b);
    } else {
      return 0;
    }
  }

  public getProductAmount(product: any): number {
    const item = this.selectedItems
      .filter((item: any) => item.product.id == product.product.id)
      .find(
        (ep: any) =>
          ep.appliedSpecs.length == product.appliedSpecs.length &&
          ep.appliedSpecs.every((appliedSpec: number) =>
            product.appliedSpecs.includes(appliedSpec)
          )
      );
    return item.amount;
  }

  public getTotalCartPrice(): number {
    if (this.selectedItems.length) {
      return this.selectedItems
        .map((product) => product.amount * product.product.price)
        .reduce((a, b) => a + b);
    } else {
      return 0;
    }
  }
}
