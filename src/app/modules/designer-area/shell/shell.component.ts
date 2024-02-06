import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {animate, animateChild, query, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  animations: [
    trigger("routeAnimationsPersonal", [
      transition("* => *", [
        query(":leave", animateChild(), {optional:true}),
        query(":leave", [
          style({ left: 0, position: 'relative', opacity: 1 }),
          animate(
            "100ms linear",
            style({ opacity: 0 })
          )
        ],{optional:true}),
        query(":enter", [
          style({ left: '100%', position: 'relative', opacity: 0 }),
          animate(
            "200ms linear",
            style({ left: '0', position: 'relative', opacity: 1})
          )
        ], {optional:true}),
        query(":enter", animateChild(), {optional:true})
      ])
    ])
  ]
})
export class ShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    );
  }
}
