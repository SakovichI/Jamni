import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ApiOrderService } from 'src/app/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IOrder } from 'src/app/interfaces/orders-payments';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>();
  public orderId = 0;
  public orders: IOrder[] = [];
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
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.orders = resp;
        this.updateScript();
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  deleteOrder(id: number) {
    this.loader.loaded = true;
    this.orderApi
      .adminDeleteOrder(id)
      .pipe(
        switchMap(() => this.orderApi.adminGetOrder()),
        tap((resp) => {
          this.loader.loaded = false;
          this.orders = resp;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  selectStatus(id: number, value: 'NEW' | 'CANCELED' | 'PAID') {
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
          this.orders = resp;
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
