import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ApiUserService } from 'src/app/core/api/api-user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalsService } from 'src/app/core/services/modals.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class ShellComponent implements OnInit, OnDestroy, AfterViewInit {
  public destroy$ = new Subject<void>();
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private auth: AuthService,
    private modal: ModalsService,
    public usersApi: ApiUserService,
    private route: Router,
    private loader: LoaderService
  ) {}
  ngAfterViewInit(): void {
    this.loader.setLoader(false);
  }

  ngOnInit(): void {
    this.loader.setLoader(true);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  submit(form: FormGroup) {
    this.auth
      .login(form.value)
      .pipe(
        switchMap(() => this.usersApi.getUser()),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (resp) => {
          if (!resp.isLocked) {
            switch (resp.userRole) {
              case 'CLIENT':
                this.route.navigate(['../client-area']);
                break;
              case 'DESIGNER':
                this.route.navigate(['../designer-area']);
                break;
              case 'WHOLESALER':
                this.route.navigate(['../wholesaler-area']);
                break;
              case 'ADMIN':
                this.route.navigate(['../admin']);
                break;
              default:
                this.route.navigate(['/']);
            }
            this.form.reset();
          } else {
            this.modal.showError('Ваш аккаунт временно заблокирован');
          }
        },
        (error) => {
          if (error.error.description === 'Access Denied') {
            this.auth.clearLocalStorage();
            this.modal.showError(
              'После проверки ваших данных, вам будет доступна авторизация'
            );
          } else {
            this.auth.clearLocalStorage();
            this.modal.showError('Неверный логин и пароль');
          }
        }
      );
  }
}
