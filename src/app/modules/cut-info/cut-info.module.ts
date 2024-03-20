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
  imports: [SharedModule, RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [ShellComponent],
})
export class CutInfoModule {}
