import {AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {ApiCategoryService} from "./core";
import {GeneralService} from "./core/services/general.service";
import {animate, animateChild, group, query, sequence, style, transition, trigger} from "@angular/animations";
import {ChildrenOutletContexts, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('showAccordion', [
      transition(':enter', [
        style({height: 0}),
        animate('0.3s linear', style({height: '*'})),
      ]),
      transition(':leave', [
        animate('0.3s linear', style({height: 0})),
      ]),
    ]),
    trigger("routeAnimations", [
      transition("* => *", [
        query(":leave", animateChild(), {optional:true}),
        query(":leave", [
          style({ opacity: 1 }),
          animate(
            "500ms linear",
            style({ opacity: 0 })
          )
        ],{optional:true}),
        query(":enter", [
          style({opacity: 0 }),
          animate(
            "500ms linear",
            style({ opacity: 1 })
          )
        ], {optional:true}),
        query(":enter", animateChild(), {optional:true})
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('closeBag') closeBag?: ElementRef;
  @ViewChild('cart') cart?: ElementRef;
  public categoryColumns: any[][] = [];
  burgerMenu: boolean = false;
  cartModal: boolean = false;
  loginModal: boolean = false;
  catalog: boolean = false;
  state: string = 'initial';
  routerOutlet: any;

  expand() {
    this.catalog = !this.catalog;
    this.state = this.catalog
      ? 'expanded'
      : 'initial';
  }

  constructor(private apiCategoryService: ApiCategoryService,
              public generalService: GeneralService,
              public contexts: ChildrenOutletContexts
              ) {
    const script: Element | null = document.querySelector('script[src="assets/main.js"]');
    // if (script){
    //   document.body.removeChild(script)
    // }
    // setTimeout(()=>{
    //   const script = document.createElement('script');
    //   script.src = 'assets/main.js';
    //   document.body.appendChild(script)
    // }, 1000)
    this.apiCategoryService.listCategories().subscribe((categories) => {
      let arr: any[] = [];
      let i = 0;
      let cat0: object;
      let cat1: object;
      categories = categories.filter((el: any) => {
        if (el.id !== 382) {
          return categories
        }
      })
      categories.forEach((category: any, i: number) => {
        if (i === 0) {
          cat0 = categories[0];
          cat1 = categories[1];
        }
        if (category.name.toLowerCase() === 'кровати') {
          categories[0] = categories[i];
          categories[i] = cat0
        }
        if (category.name.toLowerCase() === 'диваны') {
          categories[1] = categories[i];
          categories[i] = cat1
        }
      })
      categories.forEach((category: any) => {
        arr.push(category)
        i += 1;
        if (i === 2) {
          i = 0;
          this.categoryColumns.push([...arr]);
          arr = [];
        }
      })
    })
  }

  openBurger() {
    this.burgerMenu = !this.burgerMenu
    document.body.classList.toggle('disable-scroll')
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  public closeModal(): void {
    this.closeBag?.nativeElement.click();
  }

  viewsCartModal() {
    this.cartModal = !this.cartModal;
    document.body.classList.toggle('disable-scroll')
  }

  viewsLoginModal() {
    this.loginModal = !this.loginModal;
    document.body.classList.toggle('disable-scroll')
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    );
  }
}
