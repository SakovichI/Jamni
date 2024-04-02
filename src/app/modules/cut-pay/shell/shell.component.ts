import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import { IPayment } from 'src/app/interfaces/orders-payments';
import { ApiOrderService } from '../../../core';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public email?: string;
  public address?: string;
  public deliveryMethod: 'courier' | 'self' = 'courier';
  public payment: 'CARD' | 'CASH' = 'CASH';
  private checkout: any;
  public cardForm = new FormGroup({
    name: new FormControl('', Validators.required),
    cardNumber1: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ]),
    cardNumber2: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ]),
    cardNumber3: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ]),
    cardNumber4: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
    ]),
    expDateMonth: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
    ]),
    expDateYear: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
    ]),
  });
  private userIp: string = '';

  constructor(
    private router: Router,
    public generalService: GeneralService,
    private apiOrderService: ApiOrderService,
    private auth: AuthService,
    private modal: ModalsService,
    private loader: LoaderService
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
    this.setPaymentType('CASH');
    if (localStorage.getItem('form')) {
      const savedForm: any = JSON.parse(localStorage.getItem('form') as string);

      this.email = savedForm.email;
      this.address = [
        savedForm.street + ' ' + savedForm.house,
        savedForm.postcode,
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
    this.loader.loaded = true;
    const userForm = JSON.parse(localStorage.getItem('form') as string);
    const cart = JSON.parse(localStorage.getItem('cart') as string);
    const payType = localStorage.getItem('payment');
    if (payType === 'CASH') {
      if (this.auth.getToken()) {
        this.apiOrderService
          .makeOrder({
            deliveryType: 'COURIER',
            email: userForm.email,
            discountCode: 'no',
            payType: payType,
            totalCost: this.generalService.getTotalCartPrice(),
            addressId: userForm.id,
            items: cart.map((v: any) => ({
              id: v.product.id,
              name: v.product.name,
              price: v.product.price,
              coverImage: v.product.coverImage,
              amount: v.amount,
              specificationValues: v.appliedSpecs,
            })),
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.loader.loaded = false;
            localStorage.removeItem('form');
            localStorage.removeItem('delivery');
            localStorage.removeItem('payment');
            localStorage.removeItem('cart');
            this.router.navigateByUrl('/cut-res');
            setTimeout(() => {
              this.generalService.selectedItems = [];
            }, 50000);
          });
      } else {
        this.apiOrderService
          .makeOrderNoName({
            deliveryType: 'COURIER',
            email: userForm.email,
            discountCode: 'no',
            payType: payType,
            totalCost: this.generalService.getTotalCartPrice(),
            addressId: userForm.id,
            items: cart.map((v: any) => ({
              id: v.product.id,
              name: v.product.name,
              price: v.product.price,
              coverImage: v.product.coverImage,
              amount: v.amount,
              specificationValues: v.appliedSpecs,
            })),
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.loader.loaded = false;
            localStorage.removeItem('form');
            localStorage.removeItem('delivery');
            localStorage.removeItem('payment');
            localStorage.removeItem('cart');
            this.router.navigateByUrl('/cut-res');
            setTimeout(() => {
              this.generalService.selectedItems = [];
            }, 50000);
          });
      }
    } else {
      if (this.auth.getToken()) {
        this.apiOrderService
          .makeOrder({
            deliveryType: 'COURIER',
            email: userForm.email,
            discountCode: 'no',
            payType: payType,
            totalCost: this.generalService.getTotalCartPrice(),
            addressId: userForm.id,
            items: cart.map((v: any) => ({
              id: v.product.id,
              name: v.product.name,
              price: v.product.price,
              coverImage: v.product.coverImage,
              amount: v.amount,
              specificationValues: v.appliedSpecs,
            })),
          })
          .pipe(
            map((resp) => {
              const payData: IPayment = {
                orderId: resp,
                ipAddress: '',
                cardCryptogramPacket: '',
                name: `${userForm.surname} ${userForm.firstname}`,
                email: userForm.email,
              };
              this.createCryptogram(this.cardForm)
                .then((cryptogram: any) => {
                  payData.cardCryptogramPacket = cryptogram;
                  this.getIp().then((resp) => {
                    payData.ipAddress = resp;
                    this.apiOrderService
                      .orderPay(payData)
                      .pipe(takeUntil(this.destroy$))
                      .subscribe((resp) => {
                        this.loader.loaded = false;
                        localStorage.removeItem('form');
                        localStorage.removeItem('delivery');
                        localStorage.removeItem('payment');
                        localStorage.removeItem('cart');
                        this.router.navigateByUrl('/cut-res');
                        setTimeout(() => {
                          this.generalService.selectedItems = [];
                        }, 50000);
                      });
                  });
                })
                .catch((errors: any) => {
                  let error = [];
                  for (let k in errors) {
                    error.push(errors[k]);
                  }
                  this.loader.loaded = false;
                  this.modal.showError(error.join(', '));
                });
            }),
            takeUntil(this.destroy$)
          )
          .subscribe();
      } else {
        this.apiOrderService
          .makeOrderNoName({
            deliveryType: 'COURIER',
            email: userForm.email,
            discountCode: 'no',
            payType: payType,
            totalCost: this.generalService.getTotalCartPrice(),
            addressId: userForm.id,
            items: cart.map((v: any) => ({
              id: v.product.id,
              name: v.product.name,
              price: v.product.price,
              coverImage: v.product.coverImage,
              amount: v.amount,
              specificationValues: v.appliedSpecs,
            })),
          })
          .pipe(
            map((resp) => {
              const payData: IPayment = {
                orderId: resp,
                ipAddress: '',
                cardCryptogramPacket: '',
                name: `${userForm.surname} ${userForm.firstname}`,
                email: userForm.email,
              };
              this.createCryptogram(this.cardForm)
                .then((cryptogram: any) => {
                  payData.cardCryptogramPacket = cryptogram;
                  this.getIp().then((resp) => {
                    payData.ipAddress = resp;
                    this.apiOrderService
                      .orderPay(payData)
                      .pipe(takeUntil(this.destroy$))
                      .subscribe((resp) => {
                        this.loader.loaded = false;
                        localStorage.removeItem('form');
                        localStorage.removeItem('delivery');
                        localStorage.removeItem('payment');
                        localStorage.removeItem('cart');
                        this.router.navigateByUrl('/cut-res');
                        setTimeout(() => {
                          this.generalService.selectedItems = [];
                        }, 50000);
                      });
                  });
                })
                .catch((errors: any) => {
                  let error = [];
                  for (let k in errors) {
                    error.push(errors[k]);
                  }
                  this.loader.loaded = false;
                  this.modal.showError(error.join(', '));
                });
            }),
            takeUntil(this.destroy$)
          )
          .subscribe();
      }
    }
  }

  setPaymentType(value: 'CARD' | 'CASH') {
    this.payment = value;
    localStorage.setItem('payment', value);
  }

  createCryptogram(form: FormGroup) {
    console.log();

    //@ts-ignore
    this.checkout = new cp.Checkout({
      publicId: 'pk_78fc46e5dfd9efdc9470c9d81b6d7',
    });
    const fieldValues = {
      cvv: `${form.value.cvv}`,
      cardNumber: `${form.value.cardNumber1} ${form.value.cardNumber2} ${form.value.cardNumber3} ${form.value.cardNumber4}`,
      expDateMonth: `${form.value.expDateMonth}`,
      expDateYear: `${form.value.expDateYear}`,
    };

    return this.checkout.createPaymentCryptogram(fieldValues);
  }

  getIp() {
    return fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => data.ip);
  }
}
