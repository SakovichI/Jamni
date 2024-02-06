import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {ShellComponent} from "./shell/shell.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared";
import {FavoritesComponent} from "../../personal-area/components/favorites/favorites.component";
import {OrdersComponent} from "../../personal-area/components/orders/orders.component";
import {OrderComponent} from "../../personal-area/components/order/order.component";
import {DeliveryAdresComponent} from "../../personal-area/components/delivery-adres/delivery-adres.component";
import {AddressFormComponent} from "../../personal-area/components/address-form/address-form.component";
import {ModelsComponent} from "../../personal-area/components/models/models.component";
import {BonusComponent} from "../../personal-area/components/bonus/bonus.component";
import {ProfileIpComponent} from "../../personal-area/components/profile-ip/profile-ip.component";



const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'bonus',
        data: {animation: 'bonus'}
      },
      {
        path: 'bonus',
        component: BonusComponent,
        data: {animation: 'bonus'}
      },
      {
        path: 'models',
        component: ModelsComponent,
        data: {animation: 'models'}
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
      },
      {
        path: 'address',
        component: DeliveryAdresComponent,
        data: {animation: 'address'}
      },
      {
        path: 'address/:id',
        component: AddressFormComponent,
        data: {animation: 'new-address'}
      },
      {
        path: 'profile',
        component: ProfileIpComponent,
        data: {animation: 'profile'}
      }
    ]
  },
]

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), ReactiveFormsModule, SharedModule
  ]
})
export class DesignerAreaModule { }
