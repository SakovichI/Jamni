import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ApiUserService } from 'src/app/core/api/api-user.service';
import { IUsers } from 'src/app/interfaces/users-interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public formClient: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    isAdvertisementNotifications: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
  });

  constructor(private userApi: ApiUserService) {}

  ngOnInit(): void {
    this.userApi
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.updateForm(resp);
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  submit(form: FormGroup) {
    this.userApi
      .editUser(form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.updateForm(resp);
      });
  }
  updateForm(data: IUsers) {
    this.formClient = new FormGroup({
      email: new FormControl(data.email, [
        Validators.required,
        Validators.email,
      ]),
      isAdvertisementNotifications: new FormControl(
        data.isAdvertisementNotifications,
        Validators.required
      ),
      phone: new FormControl(data.phone, Validators.required),
      surname: new FormControl(data.surname, Validators.required),
      firstName: new FormControl(data.firstname, Validators.required),
      middleName: new FormControl(data.middlename, Validators.required),
    });
  }
}
