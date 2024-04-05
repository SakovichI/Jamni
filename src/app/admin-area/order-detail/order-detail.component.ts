import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { ApiOrderService } from 'src/app/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IAddress } from 'src/app/interfaces/address-inteface';
import { IOrder } from 'src/app/interfaces/orders-payments';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>();
  public orderId = 0;
  public address: IAddress = {} as IAddress;
  public order: IOrder = {} as IOrder;
  constructor(
    private loader: LoaderService,
    private orderApi: ApiOrderService,
    private activeRout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loader.loaded = false;
    this.activeRout.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => (this.orderId = Number(resp.get('id'))));

    this.orderApi
      .adminGetOrder()
      .pipe(
        map((resp) => {
          this.order = resp.filter((item) => item.id === this.orderId)[0];
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.updateScript());
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  selectStatus(
    id: number,
    value: 'NEW' | 'CANCELED' | 'PAID' | 'WAITING' | 'ERROR'
  ) {
    const data = {
      status: value,
    };
    this.loader.loaded = true;
    this.orderApi
      .adminEditOrder(id, data)
      .pipe(
        switchMap(() => this.orderApi.adminGetOrder()),
        tap((resp) => {
          this.loader.loaded = false;
          this.order = resp.filter((item: any) => item.id === this.orderId)[0];
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  updateScript() {
    setTimeout(() => {
      const scriptOld = document.querySelector('[src="assets/main.js"]');
      if (scriptOld) {
        document.body.removeChild(scriptOld);
      }
    }, 20);
    setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'assets/main.js';
      document.body.appendChild(script);
    }, 50);
  }
}
