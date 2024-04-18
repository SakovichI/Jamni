import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    id: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    country: new FormControl('Россия', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.required]),
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
    private cdr: ChangeDetectorRef,
    private router: Router
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
      this.form.controls['id'].setValue(savedForm.id);
      this.form.controls['email'].setValue(savedForm.email);
      this.form.controls['firstname'].setValue(savedForm.firstname);
      this.form.controls['surname'].setValue(savedForm.surname);
      this.form.controls['city'].setValue(savedForm.city);
      this.form.controls['postcode'].setValue(savedForm.postcode);
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
  }

  public onSaveFormToStorageClick(): void {
    if (localStorage.getItem('form')) {
      localStorage.removeItem('form');
    } else {
      localStorage.setItem('form', JSON.stringify(this.form.value));
    }
  }

  updateForm(value: IAddress) {
    this.form.controls['id'].setValue(value.id);
    this.form.controls['firstname'].setValue(value.firstname);
    this.form.controls['surname'].setValue(value.surname);
    this.form.controls['country'].setValue(value.country);
    this.form.controls['city'].setValue(value.city);
    this.form.controls['postcode'].setValue(value.postcode);
    this.form.controls['street'].setValue(value.street);
    this.form.controls['house'].setValue(value.house);
    this.form.controls['phone'].setValue(value.phone);
    this.showModal = !this.showModal;
    this.form.updateValueAndValidity();
  }

  public submitAddress(form: FormGroup) {
    if (this.auth.getToken() && this.form.controls['id'].value) {
      this.addressApi
        .editAddress(form.value, form.value.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((resp) => {
          let formData: any = resp;
          formData.email = this.form.value.email;

          localStorage.setItem('form', JSON.stringify(resp));
          this.router.navigate(['./cut-delivery']);
        });
    } else {
      this.addressApi
        .addAddressNoName(form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((resp) => {
          let formData: any = resp;
          formData.email = this.form.value.email;
          localStorage.setItem('form', JSON.stringify(resp));
          this.router.navigate(['./cut-delivery']);
        });
    }
  }
  openDropdown(elem: any) {
    const dropDown = elem.closest('.dropdown');
    const dropDownBtn = elem;
    const dropDownIcon = dropDown.querySelector('.dropdown__icon');
    const dropDownList = dropDown.querySelector('.dropdown__list');
    dropDownList.classList.toggle('dropdown__list--visible');
    dropDownIcon.classList.toggle('dropdown__icon--active');
    dropDownBtn.classList.add('dropdown__button--active');
    if (dropDownList.classList.contains('dropdown__list--visible')) {
      dropDownList.style.maxHeight = dropDownList.scrollHeight + 'px';
    } else {
      dropDownList.style.maxHeight = null;
    }
  }
}
