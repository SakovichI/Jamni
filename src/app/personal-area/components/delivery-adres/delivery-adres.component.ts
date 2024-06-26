import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiAddressService } from 'src/app/core/api/api-address.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IAddress } from 'src/app/interfaces/address-inteface';

@Component({
  selector: 'app-delivery-adres',
  templateUrl: './delivery-adres.component.html',
  styleUrls: ['./delivery-adres.component.css'],
})
export class DeliveryAdresComponent implements OnInit, OnDestroy {
  public addressArray: IAddress[] = [];
  public destroy$ = new Subject<void>();
  constructor(
    public addressApi: ApiAddressService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.loader.loaded = true;
    this.addressApi
      .getAddress()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.addressArray = resp;
        this.loader.loaded = false;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
