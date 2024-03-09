import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { FavoritesComponent } from 'src/app/personal-area/components/favorites/favorites.component';
import { AddressFormComponent } from '../../personal-area/components/address-form/address-form.component';
import { DeliveryAdresComponent } from '../../personal-area/components/delivery-adres/delivery-adres.component';
import { OrderComponent } from '../../personal-area/components/order/order.component';
import { OrdersComponent } from '../../personal-area/components/orders/orders.component';
import { ProfileComponent } from '../../personal-area/components/profile/profile.component';
import { SharedModule } from '../../shared';
import { ShellComponent } from './shell/shell.component';

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'favorites',
        data: { animation: 'favorites' },
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        data: { animation: 'favorites' },
      },
      {
        path: 'user-info',
        component: ProfileComponent,
        data: { animation: 'profile' },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: { animation: 'orders' },
      },
      {
        path: 'orders/:id',
        component: OrderComponent,
        data: { animation: 'order' },
      },
      {
        path: 'address',
        component: DeliveryAdresComponent,
        data: { animation: 'address' },
      },
      {
        path: 'address/:id',
        component: AddressFormComponent,
        data: { animation: 'new-address' },
      },
      { path: '**', redirectTo: '/', data: { animation: 'main' } },
    ],
  },
];

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class PersonalAreaClientModule {}
