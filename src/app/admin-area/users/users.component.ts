import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AdminUsersService } from 'src/app/core/api/admin/admin-users.service';
import { IUsers } from 'src/app/interfaces/users-interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public usersArr: IUsers[] = [];
  constructor(private usersApi: AdminUsersService) {}

  ngOnInit() {
    this.usersApi
      .getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.usersArr = resp;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
