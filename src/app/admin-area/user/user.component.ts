import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AdminUsersService } from 'src/app/core/api/admin/admin-users.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IUserBalance, IUsers } from 'src/app/interfaces/users-interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public userId: number = 0;
  public user: IUsers = {} as IUsers;
  public formBalance: FormGroup = new FormGroup({
    balance: new FormControl(0, [Validators.required, Validators.min(0)]),
  });
  public formClient: FormGroup = new FormGroup({
    id: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    isAdvertisementNotifications: new FormControl('', Validators.required),
    isLocked: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    middlename: new FormControl('', Validators.required),
    userRole: new FormControl(''),
  });
  public formOther: FormGroup = new FormGroup({
    id: new FormControl(''),
    isAdvertisementNotifications: new FormControl('', Validators.required),
    isLocked: new FormControl('', Validators.required),
    isModerated: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    juridicalPerson: new FormControl('', Validators.required),
    site: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    middlename: new FormControl('', Validators.required),
    userRole: new FormControl(''),
  });

  constructor(
    private usersApi: AdminUsersService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.loader.loaded = true;
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => (this.userId = Number(resp.get('id'))));

    this.usersApi
      .getUser(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.user = resp;
        this.updateForm(resp);
        if (this.user.userType === 'DESIGNER') {
          this.usersApi
            .getUserBalance(this.userId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((resp) => {
              this.updateBalance(resp);
            });
        }
        this.loader.loaded = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit(form: FormGroup) {
    this.loader.loaded = true;
    this.usersApi
      .editUser(form.value)
      .pipe(
        switchMap(() => this.usersApi.getUser(this.userId)),
        tap((resp) => {
          this.updateForm(resp);
          this.loader.loaded = false;
          this.router.navigate(['./admin/users']);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  submitBalance(form: FormGroup) {
    const data = {
      id: this.userId,
      diffBalance: form.value.balance,
    };
    this.usersApi
      .editUserBalance(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.formBalance.controls['balance'].setValue(data.diffBalance);
      });
  }

  updateForm(data: IUsers) {
    if (data.userType === 'CLIENT') {
      this.formClient = new FormGroup({
        id: new FormControl(this.userId),
        email: new FormControl(data.email, [
          Validators.required,
          Validators.email,
        ]),
        phone: new FormControl(data.phone, Validators.required),
        isAdvertisementNotifications: new FormControl(
          data.isAdvertisementNotifications,
          Validators.required
        ),
        isLocked: new FormControl(data.isLocked, Validators.required),
        surname: new FormControl(data.surname, Validators.required),
        firstname: new FormControl(data.firstname, Validators.required),
        middlename: new FormControl(data.middlename, Validators.required),
      });
    } else {
      this.formOther = new FormGroup({
        id: new FormControl(this.userId),
        isAdvertisementNotifications: new FormControl(
          data.isAdvertisementNotifications,
          Validators.required
        ),
        isLocked: new FormControl(data.isLocked, Validators.required),
        isModerated: new FormControl(data.isModerated, Validators.required),
        email: new FormControl(data.email, [
          Validators.required,
          Validators.email,
        ]),
        juridicalPerson: new FormControl(
          data.juridicalPerson,
          Validators.required
        ),
        site: new FormControl(data.site, Validators.required),
        phone: new FormControl(data.phone, Validators.required),
        surname: new FormControl(data.surname, Validators.required),
        firstname: new FormControl(data.firstname, Validators.required),
        middlename: new FormControl(data.middlename, Validators.required),
      });
    }
  }

  updateBalance(data: IUserBalance) {
    this.formBalance.controls['balance'].setValue(data.balance);
  }
}
