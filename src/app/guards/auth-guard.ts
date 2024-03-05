import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private auth: AuthService,
    private route: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.getToken()) {
      return true;
    } else {
      this.route.navigate(['/']);
      return false;
    }
  }
}
