import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { ShellComponent } from './shell';

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, SharedModule],
  declarations: [ShellComponent],
})
export class LoadProjectModule {}
