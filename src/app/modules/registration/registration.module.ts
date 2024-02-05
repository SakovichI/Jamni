import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared";
import {ShellComponent} from "../registration/shell/shell.component";
import {InputMaskModule} from "primeng/inputmask";

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
  }
]

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), ReactiveFormsModule, SharedModule, InputMaskModule
  ]
})
export class RegistrationModule { }
