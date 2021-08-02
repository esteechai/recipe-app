import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {ShoppingListService} from "./shopping-list.service";
import {ShoppingListRoutingModule} from "./shopping-list-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ShoppingListRoutingModule
  ],
  providers: []
})

export class ShoppingListModule {

}
