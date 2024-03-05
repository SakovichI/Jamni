import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class ShellComponent implements OnInit, OnDestroy {
  public codeSend: boolean = false;
  public destroy$ = new Subject<void>();
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  public formFinish: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private auth: AuthService,
    private modal: ModalsService,
    private route: Router
  ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit(form: FormGroup) {
    this.auth
      .recovery(form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (resp) => {
          this.formFinish.controls['email'].patchValue(form.value.email);
          this.codeSend = true;
        },
        (error) => {
          this.modal.showError('Пользователя с такой почтой не найдено');
        }
      );
  }

  submitFinish(form: FormGroup) {
    this.auth
      .recoveryFinish(form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (resp) => {
          form.reset();
          this.modal.showSuccess('Пароль успешно изменен');
          this.route.navigate(['./login']);
          setTimeout(() => {
            this.modal.showSuccess('');
          }, 10000);
        },
        (error) => {
          this.modal.showError('Неверный проверочный код');
        }
      );
  }
}
