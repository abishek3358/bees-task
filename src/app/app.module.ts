import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {HttpClientModule}from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,FormsModule ,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
