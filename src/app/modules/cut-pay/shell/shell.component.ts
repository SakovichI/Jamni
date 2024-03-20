import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiOrderService } from '../../../core';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnInit, OnDestroy {
  public email?: string;
  public address?: string;
  public deliveryMethod: 'courier' | 'self' = 'courier';
  public payment: 'card' | 'after' = 'card';
  constructor(
    private router: Router,
    public generalService: GeneralService,
    private apiOrderService: ApiOrderService
  ) {}

  public ngOnInit() {
    setTimeout(() => {
      const scripts: Element | null = document.querySelector(
        'script[src="assets/main.js"]'
      );
      if (scripts) {
        document.body.removeChild(scripts);
      }
      const script = document.createElement('script');
      script.src = 'assets/main.js';
      document.body.appendChild(script);
    }, 500);
    if (localStorage.getItem('form')) {
      const savedForm: any = JSON.parse(localStorage.getItem('form') as string);
      this.email = savedForm.email;
      this.address = [
        savedForm.street + ' ' + savedForm.house,
        savedForm.index,
        savedForm.city,
        'Россия',
      ].join(', ');
    }
    if (localStorage.getItem('delivery')) {
      this.deliveryMethod = localStorage.getItem('delivery') as any;
    }
    if (localStorage.getItem('payment')) {
      this.payment = localStorage.getItem('payment') as any;
    }
  }

  public ngOnDestroy() {
    localStorage.setItem('payment', this.payment);
  }

  public pay(): void {
    const userForm = JSON.parse(localStorage.getItem('form') as string);
    const cart = JSON.parse(localStorage.getItem('cart') as string);
    this.apiOrderService
      .makeOrder({
        deliveryType: 'COURIER',
        email: userForm.email,
        discountCode: 'no',
        payType: 'CASH',
        address: {
          address: [
            userForm.phone + ' ' + userForm.street + ' ' + userForm.house,
            userForm.index,
            userForm.city,
            'Россия',
          ].join(', '),
        },
        items: cart.map((v: any) => ({
          id: v.product.id,
          amount: v.amount,
          specificationValues: v.appliedSpecs,
        })),
      })
      .subscribe(() => {
        localStorage.removeItem('form');
        localStorage.removeItem('delivery');
        localStorage.removeItem('payment');
        localStorage.removeItem('cart');
        this.router.navigateByUrl('/cut-res');
        setTimeout(() => {
          this.generalService.selectedItems = [];
        }, 3000);
      });
  }
}
