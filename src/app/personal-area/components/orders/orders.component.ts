import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiOrderService } from 'src/app/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IOrder } from 'src/app/interfaces/orders-payments';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public orders: IOrder[] = [];
  constructor(
    private loader: LoaderService,
    private ordersApi: ApiOrderService
  ) {}

  ngOnInit(): void {
    this.loader.loaded = true;
    this.ordersApi
      .getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.orders = resp;
        this.loader.loaded = false;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
