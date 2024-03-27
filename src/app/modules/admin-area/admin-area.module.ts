import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { CategoryComponent } from 'src/app/admin-area/category/category.component';
import { ChildCategoryComponent } from 'src/app/admin-area/child-category/child-category.component';
import { CreateProductsComponent } from 'src/app/admin-area/create-products/create-products.component';
import { OrderDetailComponent } from 'src/app/admin-area/order-detail/order-detail.component';
import { OrdersComponent } from 'src/app/admin-area/orders/orders.component';
import { ProductComponent } from 'src/app/admin-area/product/product.component';
import { ProductsComponent } from 'src/app/admin-area/products/products.component';
import { UserComponent } from 'src/app/admin-area/user/user.component';
import { UsersComponent } from 'src/app/admin-area/users/users.component';
import { SharedModule } from 'src/app/shared';
import { ShellComponent } from './shell';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
      },
      {
        path: 'users',
        component: UsersComponent,
        data: { animation: 'users' },
      },
      {
        path: 'users/:id',
        component: UserComponent,
        data: { animation: 'user' },
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: { animation: 'category' },
      },
      {
        path: 'childCategory/:id',
        component: ChildCategoryComponent,
        data: { animation: 'category-child' },
      },
      {
        path: 'category/:id',
        component: ProductsComponent,
        data: { animation: 'products' },
      },
      {
        path: 'category/:id/product/:id',
        component: ProductComponent,
        data: { animation: 'product' },
      },
      {
        path: 'create-product',
        component: CreateProductsComponent,
        data: { animation: 'create-product' },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: { animation: 'orders' },
      },
      {
        path: 'orders/:id',
        component: OrderDetailComponent,
        data: { animation: 'order' },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TableModule,
    InputMaskModule,
    DropdownModule,
    GalleriaModule,
    AngularEditorModule,
  ],
  declarations: [
    ShellComponent,
    UsersComponent,
    UserComponent,
    ProductsComponent,
    ProductComponent,
    CategoryComponent,
    ChildCategoryComponent,
  ],
})
export class AdminAreaModule {}
