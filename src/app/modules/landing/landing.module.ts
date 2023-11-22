import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ShellComponent} from "./shell";
import {SharedModule} from "../../shared";
import {FormsModule} from "@angular/forms";

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
  }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        FormsModule
    ],
  declarations: [ShellComponent]
})
export class LandingModule{
}
