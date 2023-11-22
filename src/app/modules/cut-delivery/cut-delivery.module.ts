import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ShellComponent} from "./shell";
import {CommonModule} from "@angular/common";

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  declarations: [ShellComponent]
})
export class CutDeliveryModule {
}
