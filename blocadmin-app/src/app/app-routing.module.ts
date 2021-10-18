import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddAddressComponent} from "./components/address/add-address/add-address.component";
import {ListAddressComponent} from "./components/address/list-address/list-address.component";
import {EditAddressComponent} from "./components/address/edit-address/edit-address.component";

const routes: Routes = [

  {path: 'address/add', component: AddAddressComponent },
  {path: 'address/:id', component: EditAddressComponent},
  {path: 'address', component: ListAddressComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  data:any;
}
