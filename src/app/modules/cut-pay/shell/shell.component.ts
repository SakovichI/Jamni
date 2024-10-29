import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, map, repeat, takeUntil, takeWhile, tap } from 'rxjs';
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
      Validators.pattern(/[0-9]{4}/),
    ]),
    cardNumber2: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]{4}/),
    ]),
    cardNumber3: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]{4}/),
    ]),
    cardNumber4: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]{4}/),
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]{3}/),
    ]),
    expDateMonth: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]{2}/),
    ]),
    expDateYear: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]{2}/),
    ]),
  });
  public iframeVisible: boolean = false;

  constructor(
    private router: Router,
    public generalService: GeneralService,
    private apiOrderService: ApiOrderService,
    private auth: AuthService,
    private modal: ModalsService,
    private loader: LoaderService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.loader.setLoader(true);
    this.updateScript();
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
    this.loader.imgLoader();
  }

  public ngOnDestroy() {
    localStorage.setItem('payment', this.payment);
  }

  public pay(): void {
    this.loader.setLoader(true);
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
            this.loader.setLoader(false);
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
            this.loader.setLoader(false);
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
            map((id) => {
              const payData: IPayment = {
                orderId: id,
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
                        if (resp.success && resp.model.ReasonCode === 0) {
                          localStorage.removeItem('form');
                          localStorage.removeItem('delivery');
                          localStorage.removeItem('payment');
                          localStorage.removeItem('cart');
                          this.router.navigateByUrl('/cut-res');
                          setTimeout(() => {
                            this.generalService.selectedItems = [];
                          }, 50000);
                        } else if (
                          !resp.success &&
                          resp.model.ReasonCode !== 0 &&
                          resp.model.ReasonCode
                        ) {
                          this.modal.showError(resp.model.CardHolderMessage);
                        } else if (!resp.model.ReasonCode) {
                          this.go3dSecure(resp, id);
                          this.apiOrderService
                            .getOrderItem(id)
                            .pipe(
                              repeat({ delay: 3000 }),
                              tap((resp) => {
                                const iframe = document.querySelector('iframe');
                                if (resp === 'ERROR' && iframe) {
                                  iframe.remove();
                                  this.iframeVisible = false;
                                  this.cdr.detectChanges();
                                  this.modal.showError(
                                    'Платеж не удалось обработать, попробуйте снова'
                                  );
                                } else if (resp === 'PAID' && iframe) {
                                  iframe.remove();
                                  this.iframeVisible = false;
                                  this.cdr.detectChanges();
                                  localStorage.removeItem('form');
                                  localStorage.removeItem('delivery');
                                  localStorage.removeItem('payment');
                                  localStorage.removeItem('cart');
                                  this.router.navigateByUrl('/cut-res');
                                  setTimeout(() => {
                                    this.generalService.selectedItems = [];
                                  }, 50000);
                                }
                              }),
                              takeWhile((resp) => {
                                const iframe = document.querySelector('iframe');
                                if (resp === 'WAITING' && iframe) {
                                  return true;
                                } else {
                                  return false;
                                }
                              })
                            )
                            .subscribe();
                        }
                        this.loader.setLoader(false);
                      });
                  });
                })
                .catch((errors: any) => {
                  let error = [];
                  for (let k in errors) {
                    error.push(errors[k]);
                  }
                  this.loader.setLoader(false);
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
            map((id) => {
              const payData: IPayment = {
                orderId: id,
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
                        if (resp.success && resp.model.ReasonCode === 0) {
                          localStorage.removeItem('form');
                          localStorage.removeItem('delivery');
                          localStorage.removeItem('payment');
                          localStorage.removeItem('cart');
                          this.router.navigateByUrl('/cut-res');
                          setTimeout(() => {
                            this.generalService.selectedItems = [];
                          }, 50000);
                        } else if (
                          !resp.success &&
                          resp.model.ReasonCode !== 0 &&
                          resp.model.ReasonCode
                        ) {
                          this.modal.showError(resp.model.CardHolderMessage);
                        } else if (!resp.model.ReasonCode) {
                          this.go3dSecure(resp, id);
                          this.apiOrderService
                            .getOrderItem(id)
                            .pipe(
                              repeat({ delay: 3000 }),
                              tap((resp) => {
                                const iframe = document.querySelector('iframe');
                                if (resp === 'ERROR' && iframe) {
                                  iframe.remove();
                                  this.iframeVisible = false;
                                  this.cdr.detectChanges();
                                  this.modal.showError(
                                    'Платеж не удалось обработать, попробуйте снова'
                                  );
                                } else if (resp === 'PAID' && iframe) {
                                  iframe.remove();
                                  this.iframeVisible = false;
                                  this.cdr.detectChanges();
                                  localStorage.removeItem('form');
                                  localStorage.removeItem('delivery');
                                  localStorage.removeItem('payment');
                                  localStorage.removeItem('cart');
                                  this.router.navigateByUrl('/cut-res');
                                  setTimeout(() => {
                                    this.generalService.selectedItems = [];
                                  }, 50000);
                                }
                              }),
                              takeWhile((resp) => {
                                const iframe = document.querySelector('iframe');
                                if (resp === 'WAITING' && iframe) {
                                  return true;
                                } else {
                                  return false;
                                }
                              })
                            )
                            .subscribe();
                        }

                        this.loader.setLoader(false);
                      });
                  });
                })
                .catch((errors: any) => {
                  let error = [];
                  for (let k in errors) {
                    error.push(errors[k]);
                  }
                  this.loader.setLoader(false);
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
    //@ts-ignore
    this.checkout = new cp.Checkout({
      publicId: 'pk_a76b079e3263d760707949101c3b2',
    });
    const fieldValues = {
      cvv: `${form.value.cvv}`,
      cardNumber: `${form.value.cardNumber1} ${form.value.cardNumber2} ${form.value.cardNumber3} ${form.value.cardNumber4}`,
      expDateMonth: `${form.value.expDateMonth}`,
      expDateYear: `${form.value.expDateYear}`,
      name: `${form.value.name}`,
    };

    return this.checkout.createPaymentCryptogram(fieldValues);
  }

  getIp() {
    return fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => data.ip);
  }

  go3dSecure(data: any, id: number) {
    const externalUrl = data.model.AcsUrl;
    this.iframeVisible = true;
    this.cdr.detectChanges();
    const iframeWrap = document.querySelector('.iframe-wrap');
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'externalUrl');
    iframe.setAttribute('name', 'iframe_3d');
    iframe.classList.add('iframe-3d');
    iframeWrap?.appendChild(iframe);

    const form = document.createElement('form');
    form.setAttribute('role', 'form');
    form.setAttribute('target', 'iframe_3d');
    form.setAttribute('method', 'post');
    form.setAttribute('action', externalUrl);
    form.setAttribute('role', 'form');
    const inputMD = document.createElement('input');
    inputMD.setAttribute('name', 'MD');
    inputMD.value = data.model.TransactionId;
    form.appendChild(inputMD);
    const inputPaReq = document.createElement('input');
    inputPaReq.setAttribute('name', 'PaReq');
    inputPaReq.value = data.model.PaReq;
    form.appendChild(inputPaReq);
    const inputTermUrl = document.createElement('input');
    inputTermUrl.setAttribute('name', 'TermUrl');
    inputTermUrl.value = `https://jamnitest.ru/api/order/3ds/${id}`;
    form.appendChild(inputTermUrl);
    document.body.appendChild(form);
    form.submit();
    return iframe;
  }

  iframeClose() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.remove();
    }
    this.iframeVisible = false;
    this.cdr.detectChanges();
  }
  updateScript() {
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
      this.loader.setLoader(false);
    }, 500);
  }
}
