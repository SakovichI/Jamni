import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ShellComponent} from "./shell";
import {SharedModule} from "../../shared";
import {SortProductsPipe} from "../pipe/sort-products.pipe";
import {FormsModule} from "@angular/forms";
import {FilterProductPipe} from "../pipe/filter-product.pipe";

const routes: Route[] = [
  {
    path: ':id',
    component: ShellComponent,
  }
]

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), FormsModule],
    declarations: [ShellComponent, SortProductsPipe, FilterProductPipe],
    exports:[SortProductsPipe, FilterProductPipe]

})
export class CategoryModule {
}
