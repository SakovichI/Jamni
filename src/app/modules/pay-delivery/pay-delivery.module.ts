import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ShellComponent} from "./shell";

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [ShellComponent]
})
export class PayDeliveryModule {
}
