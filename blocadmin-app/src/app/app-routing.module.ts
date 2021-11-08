import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddAddressComponent} from "./components/address/add-address/add-address.component";
import {ListAddressComponent} from "./components/address/list-address/list-address.component";
import {EditAddressComponent} from "./components/address/edit-address/edit-address.component";
import {HomeComponent} from "./components/auth/home/home.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {ProfileComponent} from "./components/auth/profile/profile.component";
import {ListPersonComponent} from "./components/person/list-person/list-person.component";
import {AddPersonComponent} from "./components/person/add-person/add-person.component";
import {EditPersonComponent} from "./components/person/edit-person/edit-person.component";
import {ListBuildingComponent} from "./components/building/list-building/list-building.component";
import {EditBuildingComponent} from "./components/building/edit-building/edit-building.component";
import {AddBuildingComponent} from "./components/building/add-building/add-building.component";
import {ListFlatComponent} from "./components/flat/list-flat/list-flat.component";
import {EditFlatComponent} from "./components/flat/edit-flat/edit-flat.component";
import {AddFlatComponent} from "./components/flat/add-flat/add-flat.component";
import {ListInvoiceComponent} from "./components/invoice/list-invoice/list-invoice.component";
import {EditInvoiceComponent} from "./components/invoice/edit-invoice/edit-invoice.component";
import {AddInvoiceComponent} from "./components/invoice/add-invoice/add-invoice.component";
import {ListMeterComponent} from "./components/meter/list-meter/list-meter.component";
import {EditMeterComponent} from "./components/meter/edit-meter/edit-meter.component";
import {AddMeterComponent} from "./components/meter/add-meter/add-meter.component";
import {ListMeterdataComponent} from "./components/meterdata/list-meterdata/list-meterdata.component";
import {EditMeterdataComponent} from "./components/meterdata/edit-meterdata/edit-meterdata.component";
import {AddMeterdataComponent} from "./components/meterdata/add-meterdata/add-meterdata.component";
import {ListSupplierComponent} from "./components/supplier/list-supplier/list-supplier.component";
import {EditSupplierComponent} from "./components/supplier/edit-supplier/edit-supplier.component";
import {AddSupplierComponent} from "./components/supplier/add-supplier/add-supplier.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'address/add', component: AddAddressComponent },
  {path: 'address/:id', component: EditAddressComponent},
  {path: 'address', component: ListAddressComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'person/add', component: AddPersonComponent },
  { path: 'person/:id', component: EditPersonComponent },
  { path: 'person', component: ListPersonComponent },
  { path: 'buildings/add', component: AddBuildingComponent },
  { path: 'buildings/:id', component: EditBuildingComponent },
  { path: 'buildings', component: ListBuildingComponent },
  { path: 'flats/add', component: AddFlatComponent },
  { path: 'flats/:id', component: EditFlatComponent },
  { path: 'flats', component: ListFlatComponent },
  { path: 'invoices/add', component: AddInvoiceComponent },
  { path: 'invoices/:id', component: EditInvoiceComponent },
  { path: 'invoices', component: ListInvoiceComponent },
  { path: 'meters/add', component: AddMeterComponent },
  { path: 'meters/:id', component: EditMeterComponent },
  { path: 'meters', component: ListMeterComponent },
  { path: 'meterdata/add', component: AddMeterdataComponent },
  { path: 'meterdata/:id', component: EditMeterdataComponent },
  { path: 'meterdata', component: ListMeterdataComponent },
  { path: 'suppliers/add', component: AddSupplierComponent },
  { path: 'suppliers/:id', component: EditSupplierComponent },
  { path: 'suppliers', component: ListSupplierComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  data:any;
}
