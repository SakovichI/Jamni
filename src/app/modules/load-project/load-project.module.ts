import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ShellComponent} from "../log-in/shell";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared";

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, SharedModule],
  declarations: [ShellComponent]
})
export class LoadProjectModule {
}
