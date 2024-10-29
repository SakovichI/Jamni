import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  animations: [
    trigger('routeAnimationsPersonal', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
            }),
          ],
          { optional: true }
        ),
        query(':enter', [style({ left: '100%' })], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(
            ':leave',
            [animate('400ms ease-out', style({ left: '-100%', opacity: 0 }))],
            { optional: true }
          ),
          query(':enter', [animate('500ms ease-out', style({ left: '0%' }))], {
            optional: true,
          }),
          query('@*', animateChild(), { optional: true }),
        ]),
      ]),
    ]),
  ],
})
export class ShellComponent implements OnInit, AfterViewInit {
  constructor(public auth: AuthService, private loader: LoaderService) {}

  ngOnInit(): void {
    this.loader.setLoader(true);
  }
  ngAfterViewInit(): void {
    this.loader.setLoader(false);
    this.loader.imgLoader();
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
