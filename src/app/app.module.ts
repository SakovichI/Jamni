import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule, provideRoutes } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';
import { PaginatorModule } from 'primeng/paginator';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth-guard';
import { AuthInterceptor } from './interceptors/auth-interceptors';
import { ErrorComponent } from './modals/error/error.component';
import { SuccessComponent } from './modals/success/success.component';
import { AddressFormComponent } from './personal-area/components/address-form/address-form.component';
import { BonusComponent } from './personal-area/components/bonus/bonus.component';
import { DeliveryAdresComponent } from './personal-area/components/delivery-adres/delivery-adres.component';
import { FavoritesComponent } from './personal-area/components/favorites/favorites.component';
import { ModelsComponent } from './personal-area/components/models/models.component';
import { OrderComponent } from './personal-area/components/order/order.component';
import { OrdersComponent } from './personal-area/components/orders/orders.component';
import { PriceComponent } from './personal-area/components/price/price.component';
import { ProfileIpComponent } from './personal-area/components/profile-ip/profile-ip.component';
import { ProfileComponent } from './personal-area/components/profile/profile.component';
import { SharedModule } from './shared';

const personalRoutes: Route[] = [
  {
    path: 'favorites',
    component: FavoritesComponent,
    outlet: 'personal',
  },
];
const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('@landing').then((m) => m.LandingModule),
  },
  {
    path: 'category',
    loadChildren: () => import('@category').then((m) => m.CategoryModule),
    data: { animation: 'category' },
  },
  {
    path: 'decor',
    loadChildren: () => import('@decor').then((m) => m.CategoryDecorModule),
    data: { animation: 'decor' },
  },
  {
    path: 'sofas',
    loadChildren: () => import('@sofas').then((m) => m.CategorySofasModule),
    data: { animation: 'sofas' },
  },
  {
    path: 'product-sofas',
    loadChildren: () =>
      import('@product-sofas').then((m) => m.ProductSofasModule),
    data: { animation: 'product-sofas' },
  },
  {
    path: 'product',
    loadChildren: () => import('@product').then((m) => m.ProductModule),
    data: { animation: 'product' },
  },
  {
    path: 'cut-info',
    loadChildren: () => import('@cut-info').then((m) => m.CutInfoModule),
    data: { animation: 'cut-info' },
  },
  {
    path: 'cut-delivery',
    loadChildren: () =>
      import('@cut-delivery').then((m) => m.CutDeliveryModule),
    data: { animation: 'cut-delivery' },
  },
  {
    path: 'cut-pay',
    loadChildren: () => import('@cut-pay').then((m) => m.CutPayModule),
    data: { animation: 'cut-pay' },
  },
  {
    path: 'cut-res',
    loadChildren: () => import('@cut-res').then((m) => m.CutResModule),
    data: { animation: 'cut-res' },
  },
  {
    path: 'delivery',
    loadChildren: () => import('@delivery').then((m) => m.DeliveryModule),
    data: { animation: 'delivery' },
  },
  {
    path: 'load-project',
    loadChildren: () =>
      import('@load-project').then((m) => m.LoadProjectModule),
    data: { animation: 'load-projects' },
  },
  {
    path: 'contacts-page',
    loadChildren: () =>
      import('@contacts-page').then((m) => m.ContactsPageModule),
    data: { animation: 'contacts-page' },
  },
  {
    path: 'about-company',
    loadChildren: () =>
      import('@about-company').then((m) => m.AboutCompanyModule),
    data: { animation: 'about' },
  },
  {
    path: 'news-page',
    loadChildren: () => import('@news-page').then((m) => m.NewsPageModule),
    data: { animation: 'news' },
  },
  {
    path: 'all-news',
    loadChildren: () => import('@all-news').then((m) => m.AllNewsModule),
    data: { animation: 'all-news' },
  },
  {
    path: 'reviews',
    loadChildren: () => import('@reviews').then((m) => m.ReviewsModule),
    data: { animation: 'reviews' },
  },
  {
    path: 'pay-delivery',
    loadChildren: () =>
      import('@pay-delivery').then((m) => m.PayDeliveryModule),
    data: { animation: 'pay-delivery' },
  },
  {
    path: 'catalog',
    loadChildren: () => import('@catalog').then((m) => m.CatalogModule),
    data: { animation: 'catalog' },
  },
  {
    path: 'login',
    loadChildren: () => import('@login').then((m) => m.LogInModule),
    data: { animation: 'login' },
  },
  {
    path: 'recovery',
    loadChildren: () => import('@recovery').then((m) => m.RecoveryModule),
    data: { animation: 'recovery' },
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('@registration').then((m) => m.RegistrationModule),
    data: { animation: 'registration' },
  },
  {
    path: 'admin',
    loadChildren: () => import('@admin-area').then((m) => m.AdminAreaModule),
    data: { animation: 'admin-area' },
    canActivate: [AuthGuard],
  },
  {
    path: 'client-area',
    loadChildren: () =>
      import('@client-area').then((m) => m.PersonalAreaClientModule),
    data: { animation: 'client-area' },
    canActivate: [AuthGuard],
  },
  {
    path: 'designer-area',
    loadChildren: () =>
      import('src/app/modules/designer-area').then((m) => m.DesignerAreaModule),
    data: { animation: 'designer-area' },
    canActivate: [AuthGuard],
  },
  {
    path: 'wholesaler-area',
    loadChildren: () =>
      import('@wholesaler-area').then((m) => m.ResalerAreaModule),
    data: { animation: 'wholesaler' },
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () => import('@landing').then((m) => m.LandingModule),
  },
];

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    OrdersComponent,
    OrderComponent,
    DeliveryAdresComponent,
    AddressFormComponent,

    ProfileComponent,
    ProfileIpComponent,
    PriceComponent,
    BonusComponent,
    ModelsComponent,
    ErrorComponent,
    SuccessComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    TableModule,
    InputMaskModule,
    SliderModule,
    PaginatorModule,
  ],
  providers: [
    provideRoutes(routes),
    NgModel,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
