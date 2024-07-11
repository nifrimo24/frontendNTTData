import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulosRoutingModule } from './modulos.routing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListBankingProductsComponent } from './banking-products/list-banking-products/list-banking-products.component';


@NgModule({
  declarations: [
    ListBankingProductsComponent
  ],
  imports: [
    CommonModule,
    ModulosRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class HomeModule { }
