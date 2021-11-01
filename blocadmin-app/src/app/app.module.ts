import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {AddAddressComponent } from './components/address/add-address/add-address.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LeftmenuComponent} from "./components/leftmenu/leftmenu.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {HttpClientModule} from "@angular/common/http";
import {ListAddressComponent } from './components/address/list-address/list-address.component';
import {EditAddressComponent } from './components/address/edit-address/edit-address.component';
import {NgbAccordionModule, NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { authInterceptorProviders } from './components/auth/auth.interceptor';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/auth/home/home.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { BoardAdminComponent } from './components/auth/board-admin/board-admin.component';
import { BoardBlocadminComponent } from './components/auth/board-blocadmin/board-blocadmin.component';
import { BoardPersonComponent } from './components/auth/board-person/board-person.component';
import { AddPersonComponent } from './components/person/add-person/add-person.component';
import { EditPersonComponent } from './components/person/edit-person/edit-person.component';
import { ListPersonComponent } from './components/person/list-person/list-person.component';
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftmenuComponent,
    AddAddressComponent,
    ListAddressComponent,
    EditAddressComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardBlocadminComponent,
    BoardPersonComponent,
    AddPersonComponent,
    EditPersonComponent,
    ListPersonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbAccordionModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgSelectModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
