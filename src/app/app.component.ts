import {
  animate,
  animateChild,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiCategoryService } from './core';
import { ApiUserService } from './core/api/api-user.service';
import { AuthService } from './core/services/auth.service';
import { GeneralService } from './core/services/general.service';
import { LoaderService } from './core/services/loader.service';
import { ModalsService } from './core/services/modals.service';
import { IUsers } from './interfaces/users-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('showAccordion', [
      transition(':enter', [
        style({ height: 0 }),
        animate('0.3s linear', style({ height: '*' })),
      ]),
      transition(':leave', [animate('0.3s linear', style({ height: 0 }))]),
    ]),
    trigger('routeAnimations', [
      transition('* => *', [
        query(':leave', animateChild(), { optional: true }),
        query(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('300ms linear', style({ opacity: 0 })),
          ],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('300ms linear', style({ opacity: 1 })),
          ],
          { optional: true }
        ),
        query(':enter', animateChild(), { optional: true }),
      ]),
    ]),
  ],
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('closeBag') closeBag?: ElementRef;
  @ViewChild('cart') cart?: ElementRef;
  public categoryColumns: any[][] = [];
  burgerMenu: boolean = false;
  cartModal: boolean = false;
  loginModal: boolean = false;
  catalog: boolean = false;
  state: string = 'initial';
  routerOutlet: any;
  countFavorite: number = 0;
  public user: IUsers = {} as IUsers;
  public destroy$ = new Subject<void>();

  expand() {
    this.catalog = !this.catalog;
    this.state = this.catalog ? 'expanded' : 'initial';
  }

  constructor(
    private apiCategoryService: ApiCategoryService,
    public generalService: GeneralService,
    public contexts: ChildrenOutletContexts,
    public auth: AuthService,
    public userApi: ApiUserService,
    public route: Router,
    public modal: ModalsService,
    public loader: LoaderService
  ) {
    const script: Element | null = document.querySelector(
      'script[src="assets/main.js"]'
    );
    this.apiCategoryService.listCategories().subscribe((categories) => {
      let arr: any[] = [];
      let i = 0;
      let cat0: object;
      let cat1: object;
      categories = categories.filter((el: any) => {
        if (el.id !== 382) {
          return categories;
        }
      });
      categories.forEach((category: any, i: number) => {
        if (i === 0) {
          cat0 = categories[0];
          cat1 = categories[1];
        }
        if (category.name.toLowerCase() === 'кровати') {
          categories[0] = categories[i];
          categories[i] = cat0;
        }
        if (category.name.toLowerCase() === 'диваны') {
          categories[1] = categories[i];
          categories[i] = cat1;
        }
      });
      categories.forEach((category: any) => {
        arr.push(category);
        i += 1;
        if (i === 2) {
          i = 0;
          this.categoryColumns.push([...arr]);
          arr = [];
        }
      });
    });
  }

  openBurger() {
    this.burgerMenu = !this.burgerMenu;
    document.body.classList.toggle('disable-scroll');
  }

  ngOnInit() {
    this.loader.setLoader(true);
    if (this.auth.getToken()) {
      this.userApi
        .getUser()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (resp) => {
            this.userApi.userS.next(resp);
            this.user = resp;
            if (this.user.userType !== 'ADMIN') {
              this.userApi
                .getFavorites()
                .pipe(takeUntil(this.destroy$))
                .subscribe();
              this.userApi.userFavoriteS
                .pipe(takeUntil(this.destroy$))
                .subscribe((resp) => {
                  this.countFavorite = resp.length;
                  this.loader.setLoader(false);
                });
            }
          },
          (error) => {
            if (
              error.error.description ===
              'Invalid authorization token: Unexpected content JWS.'
            ) {
              this.route.navigate(['/']);
              localStorage.clear();
            }
          }
        );
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit() {}

  public closeModal(): void {
    this.closeBag?.nativeElement.click();
  }

  viewsCartModal() {
    this.cartModal = !this.cartModal;
    document.body.classList.toggle('disable-scroll');
  }

  viewsLoginModal() {
    this.loginModal = !this.loginModal;
    document.body.classList.toggle('disable-scroll');
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  login() {
    if (this.auth.getToken()) {
      this.userApi.userS.pipe(takeUntil(this.destroy$)).subscribe(
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
          } else {
            this.modal.showError('Ваш аккаунт временно заблокирован');
          }
        },
        (error) => {
          if (
            error.error.description ===
            'Invalid authorization token: Unexpected content JWS.'
          ) {
            this.route.navigate(['/']);
            localStorage.clear();
          }
        }
      );
    } else {
      this.route.navigate(['login']);
    }
  }
  routeFavorites() {
    if (this.auth.getToken()) {
      this.userApi.userS.pipe(takeUntil(this.destroy$)).subscribe(
        (resp) => {
          switch (resp.userType) {
            case 'CLIENT':
              this.route.navigate(['../client-area/favorites']);
              break;
            case 'DESIGNER':
              this.route.navigate(['../designer-area/favorites']);
              break;
            case 'WHOLESALER':
              this.route.navigate(['../wholesaler-area/favorites']);
              break;
            default:
              this.route.navigate(['./']);
          }
        },
        (error) => {
          if (
            error.error.description ===
            'Invalid authorization token: Unexpected content JWS.'
          ) {
            this.route.navigate(['/']);
            localStorage.clear();
          }
        }
      );
    } else {
      this.route.navigate(['catalog']);
    }
  }
}
