import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ShellComponent} from "./shell";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared";

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
  }
]

@NgModule({
  imports: [SharedModule,RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [ShellComponent]
})
export class CutInfoModule {
}
