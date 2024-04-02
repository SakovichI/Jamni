import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { ShellComponent } from './shell';

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  declarations: [ShellComponent],
})
export class CutPayModule {}
