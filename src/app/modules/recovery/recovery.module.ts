import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ShellComponent } from './shell';

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
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
export class RecoveryModule {}
