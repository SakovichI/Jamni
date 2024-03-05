import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalsService } from 'src/app/core/services/modals.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class ShellComponent implements OnInit {
  private destroy$ = new Subject<void>();
  public formType: string = 'клиент';
  public clientForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    isAdvertisementNotifications: new FormControl(true, Validators.required),
  });
  public designerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    site: new FormControl('', Validators.required),
    juridicalPerson: new FormControl('', Validators.required),
    workingWithUs: new FormControl('', Validators.required),
    designCollection: new FormControl('', Validators.required),
  });
  public wholesalerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    site: new FormControl('', Validators.required),
    juridicalPerson: new FormControl('', Validators.required),
  });
  constructor(
    private auth: AuthService,
    private route: Router,
    private modal: ModalsService
  ) {}

  ngOnInit(): void {}

  changeForm(event: any) {
    this.formType = event.target.value.toLowerCase();
  }
  regClient(form: FormGroup) {
    this.auth
      .registrationClient(form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.modal.showSuccess(
            'Регистрация прошла успешна, теперь вы можете авторизоваться'
          );
          form.reset();
          this.route.navigate(['./login']);
          setTimeout(() => {
            this.modal.showSuccess('');
          }, 10000);
        },
        (error) => {
          if (error.status === 500) {
            this.modal.showError('Пользователь с такой почтой уже существует');
          }
        }
      );
  }
  regDesigner(form: FormGroup) {
    this.auth
      .registrationDesigner(form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.modal.showSuccess(
            'Ваша заявка на регистрацию успешно подана, после проверки администрацией вам будет доступна авторизация!'
          );
          form.reset();
          this.route.navigate(['./login']);
          setTimeout(() => {
            this.modal.showSuccess('');
          }, 10000);
        },
        (error) => {
          if (error.status === 500) {
            this.modal.showError('Пользователь с такой почтой уже существует');
          }
        }
      );
  }
  regWholesaler(form: FormGroup) {
    this.auth
      .registrationWholesaler(form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.modal.showSuccess(
            'Ваша заявка на регистрацию успешно подана, после проверки администрацией вам будет доступна авторизация!'
          );
          form.reset();
          this.route.navigate(['./login']);
          setTimeout(() => {
            this.modal.showSuccess('');
          }, 10000);
        },
        (error) => {
          if (error.status === 500) {
            this.modal.showError('Пользователь с такой почтой уже существует');
          }
        }
      );
  }
}
