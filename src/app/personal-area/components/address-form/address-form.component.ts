import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { ApiAddressService } from 'src/app/core/api/api-address.service';
import { IAddress } from 'src/app/interfaces/address-inteface';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent implements OnInit, OnDestroy {
  public id: number = 0;
  private destroy$ = new Subject<void>();

  public form: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postcode: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    house: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });
  constructor(
    public addressApi: ApiAddressService,
    public activeRoute: ActivatedRoute,
    public route: Router
  ) {
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
  }

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => (this.id = Number(resp['id'])));
    if (this.id !== 0) {
      this.addressApi
        .getAddress()
        .pipe(
          map((resp) => {
            let address: IAddress[];
            address = resp.filter((el) => el.id === this.id);
            this.updateFom(address[0]);
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit(form: FormGroup) {
    if (this.id === 0) {
      console.log(form.value);

      this.addressApi
        .addAddress(form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((resp) => {
          this.route.navigate(['../'], { relativeTo: this.activeRoute });
        });
    } else {
      this.addressApi
        .editAddress(form.value, this.id)
        .pipe(
          tap((resp) => {
            this.updateFom(form.value);
            this.route.navigate(['../'], { relativeTo: this.activeRoute });
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  updateFom(data: IAddress) {
    this.form = new FormGroup({
      firstname: new FormControl(data.firstname, Validators.required),
      surname: new FormControl(data.surname, Validators.required),
      country: new FormControl(data.country, Validators.required),
      city: new FormControl(data.city, Validators.required),
      postcode: new FormControl(data.postcode, Validators.required),
      street: new FormControl(data.street, Validators.required),
      house: new FormControl(data.house, Validators.required),
      phone: new FormControl(data.phone, Validators.required),
    });
  }
  deleteAddress(id: number) {
    this.addressApi
      .deleteAddress(id)
      .pipe(
        tap(() => {
          this.route.navigate(['../'], { relativeTo: this.activeRoute });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
