import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared";
import {Route, RouterModule} from "@angular/router";
import {ShellComponent} from "./shell";

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent
  }
]

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [ShellComponent]
})
export class NewsPageModule{
}
