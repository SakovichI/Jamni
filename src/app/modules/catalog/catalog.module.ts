import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ShellComponent} from "./shell";
import {SharedModule} from "../../shared";

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [ShellComponent]
})
export class CatalogModule {
}
