import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ApiUserService } from 'src/app/core/api/api-user.service';
import { LoaderService } from 'src/app/core/services/loader.service';
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
    firstname: new FormControl('', Validators.required),
    middlename: new FormControl('', Validators.required),
  });

  constructor(private userApi: ApiUserService, private loader: LoaderService) {}

  ngOnInit(): void {
    this.loader.loaded = true;
    this.userApi.userS.subscribe((resp) => {
      this.updateForm(resp);
      this.loader.loaded = false;
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  submit(form: FormGroup) {
    this.loader.loaded = true;
    this.userApi
      .editUser(form.value)
      .pipe(
        switchMap(() => this.userApi.getUser()),
        takeUntil(this.destroy$)
      )
      .subscribe((resp) => {
        form.reset();
        this.updateForm(resp);
        this.loader.loaded = false;
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
      firstname: new FormControl(data.firstname, Validators.required),
      middlename: new FormControl(data.middlename, Validators.required),
    });
  }
}
