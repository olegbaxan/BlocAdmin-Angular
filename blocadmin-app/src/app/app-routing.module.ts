import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddAddressComponent} from "./components/address/add-address/add-address.component";
import {ListAddressComponent} from "./components/address/list-address/list-address.component";
import {EditAddressComponent} from "./components/address/edit-address/edit-address.component";
import {HomeComponent} from "./components/auth/home/home.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {ProfileComponent} from "./components/auth/profile/profile.component";
import {BoardAdminComponent} from "./components/auth/board-admin/board-admin.component";
import {BoardBlocadminComponent} from "./components/auth/board-blocadmin/board-blocadmin.component";
import {BoardPersonComponent} from "./components/auth/board-person/board-person.component";
import {ListPersonComponent} from "./components/person/list-person/list-person.component";
import {AddPersonComponent} from "./components/person/add-person/add-person.component";
import {EditPersonComponent} from "./components/person/edit-person/edit-person.component";
import {iif} from "rxjs";

const routes: Routes = [
  {path: 'address/add', component: AddAddressComponent },
  {path: 'address/:id', component: EditAddressComponent},
  {path: 'address', component: ListAddressComponent },

  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'person/add', component: AddPersonComponent },
  { path: 'person/:id', component: EditPersonComponent },
  { path: 'person', component: ListPersonComponent },

  // { path: 'mod', component: BoardBlocadminComponent },
  // { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  data:any;
}
