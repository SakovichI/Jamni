import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideRoutes, Route, RouterModule, RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared";
import {ShellComponent} from "./shell/shell.component";
import {FavoritesComponent} from "../../personal-area/components/favorites/favorites.component";
import {OrdersComponent} from "../../personal-area/components/orders/orders.component";
import {OrderComponent} from "../../personal-area/components/order/order.component";

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'favorites',
        data: {animation: 'favorites'}
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        data: {animation: 'favorites'}
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: {animation: 'orders'}
      },
      {
        path: 'orders/:id',
        component: OrderComponent,
        data: {animation: 'order'}
      }
    ]
  },
]

@NgModule({
  declarations: [ShellComponent, FavoritesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), ReactiveFormsModule, SharedModule
  ],

})
export class PersonalAreaClientModule {
}
