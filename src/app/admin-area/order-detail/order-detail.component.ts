import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { ApiOrderService } from 'src/app/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IOrder } from 'src/app/interfaces/orders-payments';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>();
  public orderId = 0;
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
          console.log(this.order);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
