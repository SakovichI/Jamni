import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ShellComponent} from "./shell";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [ShellComponent]
})
export class ContactsPageModule {
}
