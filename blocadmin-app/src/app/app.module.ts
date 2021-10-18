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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftmenuComponent,
    AddAddressComponent,
    ListAddressComponent,
    EditAddressComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
