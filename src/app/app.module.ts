import {APP_BOOTSTRAP_LISTENER, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import {provideRoutes, Route, RouterModule, RouterOutlet} from "@angular/router";
import {SharedModule} from "./shared";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FavoritesComponent } from './personal-area/components/favorites/favorites.component';
import { OrdersComponent } from './personal-area/components/orders/orders.component';
import { OrderComponent } from './personal-area/components/order/order.component';
import {TableModule} from "primeng/table";
import { DeliveryAdresComponent } from './personal-area/components/delivery-adres/delivery-adres.component';
import { AddressFormComponent } from './personal-area/components/address-form/address-form.component';
import {InputMaskModule} from "primeng/inputmask";
import { ProfileComponent } from './personal-area/components/profile/profile.component';

const personalRoutes: Route[] = [
  {
    path: 'favorites',
    component: FavoritesComponent,
    outlet: 'personal'
  },
]
const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@landing').then((m) => m.LandingModule),
  },
  {
    path: 'category',
    loadChildren: () => import('@category').then((m) => m.CategoryModule),
    data: {animation: 'category'}

  },
  {
    path: 'decor',
    loadChildren: () => import('@decor').then((m) => m.CategoryDecorModule),
    data: {animation: 'decor'}
  },
  {
    path: 'sofas',
    loadChildren: () => import('@sofas').then((m) => m.CategorySofasModule),
    data: {animation: 'sofas'}
  },
  {
    path: 'product-sofas',
    loadChildren: () => import('@product-sofas').then((m) => m.ProductSofasModule),
    data: {animation: 'product-sofas'}
  },
  {
    path: 'product',
    loadChildren: () => import('@product').then((m) => m.ProductModule),
    data: {animation: 'product'}
  },
  {
    path: 'cut-info',
    loadChildren: () => import('@cut-info').then((m) => m.CutInfoModule),
    data: {animation: 'cut-info'}
  },
  {
    path: 'cut-delivery',
    loadChildren: () => import('@cut-delivery').then((m) => m.CutDeliveryModule),
    data: {animation: 'cut-delivery'}
  },
  {
    path: 'cut-pay',
    loadChildren: () => import('@cut-pay').then((m) => m.CutPayModule),
    data: {animation: 'cut-pay'}
  },
  {
    path: 'cut-res',
    loadChildren: () => import('@cut-res').then((m) => m.CutResModule),
    data: {animation: 'cut-res'}
  },
  {
    path: 'delivery',
    loadChildren: () => import('@delivery').then((m) => m.DeliveryModule),
    data: {animation: 'delivery'}
  },
  {
    path: 'load-project',
    loadChildren: () => import('@load-project').then((m) => m.LoadProjectModule),
    data: {animation: 'load-projects'}
  },
  {
    path: 'contacts-page',
    loadChildren: () => import('@contacts-page').then((m) => m.ContactsPageModule),
    data: {animation: 'contacts-page'}
  },
  {
    path: 'about-company',
    loadChildren: () => import('@about-company').then((m) => m.AboutCompanyModule),
    data: {animation: 'about'}
  },
  {
    path: 'news-page',
    loadChildren: () => import('@news-page').then((m) => m.NewsPageModule),
    data: {animation: 'news'}
  },
  {
    path: 'all-news',
    loadChildren: () => import('@all-news').then((m) => m.AllNewsModule),
    data: {animation: 'all-news'}
  },
  {
    path: 'reviews',
    loadChildren: () => import('@reviews').then((m)=>m.ReviewsModule),
    data: {animation: 'reviews'}
  },
  {
    path: 'pay-delivery',
    loadChildren: () => import('@pay-delivery').then((m)=>m.PayDeliveryModule),
    data: {animation: 'pay-delivery'}
  },
  {
    path: 'catalog',
    loadChildren: () => import('@catalog').then((m)=>m.CatalogModule),
    data: {animation: 'catalog'}
  },
  {
    path: 'login',
    loadChildren: () => import('@login').then((m)=>m.LogInModule),
    data: {animation: 'login'}
  },
  {
    path: 'registration',
    loadChildren: () => import('@registration').then((m)=>m.RegistrationModule),
    data: {animation: 'registration'}
  },
  {
    path: 'client-area',
    loadChildren: () => import('@client-area').then((m)=>m.PersonalAreaClientModule),
    data: {animation: 'client-area'},

  },
  {
    path: 'designer-area',
    loadChildren: () => import('@designer-area').then((m)=>m.DesignerAreaModule),
    data: {animation: 'designer-area'}
  },
  {
    path: 'wholesaler-area',
    loadChildren: () => import('@wholesaler-area').then((m)=>m.ResalerAreaModule),
    data: {animation: 'wholesaler'},
  },
]


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    DeliveryAdresComponent,
    AddressFormComponent,
    ProfileComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    TableModule,
    InputMaskModule
  ],
  providers: [
    provideRoutes(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
