import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ShellComponent} from "./shell";
import {SharedModule} from "../../shared";

const routes: Route[] = [
  {
    path: ':id',
    component: ShellComponent,
  }
]

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [ShellComponent]
})
export class ProductModule {
}
