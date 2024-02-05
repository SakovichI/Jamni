import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {ShellComponent} from "./shell/shell.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared";



const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), ReactiveFormsModule, SharedModule
  ]
})
export class ResalerAreaModule { }
