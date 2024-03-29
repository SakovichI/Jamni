import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ApiAddressService } from 'src/app/core/api/api-address.service';
import { ApiUserService } from 'src/app/core/api/api-user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IAddress } from 'src/app/interfaces/address-inteface';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shell.component.css'],
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>();
  private email = '';
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    country: new FormControl('Россия', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    index: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    house: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+\d{1}\(\d{3}\) \d{3}-\d{2}-\d{2}$/),
    ]),
  });
  public showModal = false;
  public addressArray: IAddress[] = [];

  constructor(
    public generalService: GeneralService,
    private addressApi: ApiAddressService,
    public auth: AuthService,
    private userApi: ApiUserService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
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
      const savedForm = JSON.parse(localStorage.getItem('form') as string);
      this.form.controls['email'].setValue(savedForm.email);
      this.form.controls['name'].setValue(savedForm.name);
      this.form.controls['surname'].setValue(savedForm.surname);
      this.form.controls['city'].setValue(savedForm.city);
      this.form.controls['index'].setValue(savedForm.index);
      this.form.controls['street'].setValue(savedForm.street);
      this.form.controls['house'].setValue(savedForm.house);
      this.form.controls['phone'].setValue(savedForm.phone);
    }
    if (this.auth.getToken()) {
      this.showModal = !this.showModal;
      this.userApi.userS.subscribe((resp) => {
        this.email = resp.email;
        this.form.controls['email'].setValue(resp.email);
      });
      this.addressApi
        .getAddress()
        .pipe(takeUntil(this.destroy$))
        .subscribe((resp) => {
          this.addressArray = resp;
          this.cdr.detectChanges();
        });
    }
  }
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    localStorage.setItem('form', JSON.stringify(this.form.value));
  }

  public onSaveFormToStorageClick(): void {
    if (localStorage.getItem('form')) {
      localStorage.removeItem('form');
    } else {
      localStorage.setItem('form', JSON.stringify(this.form.value));
    }
  }

  updateForm(value: IAddress) {
    this.form.controls['name'].setValue(value.firstname);
    this.form.controls['surname'].setValue(value.surname);
    this.form.controls['country'].setValue(value.country);
    this.form.controls['city'].setValue(value.city);
    this.form.controls['index'].setValue(value.postcode);
    this.form.controls['street'].setValue(value.street);
    this.form.controls['house'].setValue(value.house);
    this.form.controls['phone'].setValue(value.phone);

    this.showModal = !this.showModal;
  }
}
