import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShellComponent} from './shell/shell.component';
import {Route, RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared";

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
  }
]


@NgModule({
  declarations: [
    ShellComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), ReactiveFormsModule, SharedModule
  ]
})
export class LogInModule {
}
