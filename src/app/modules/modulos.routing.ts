import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListBankingProductsComponent} from "./banking-products/list-banking-products/list-banking-products.component";
import {FormBankingProductsComponent} from "./banking-products/form-banking-products/form-banking-products.component";
import {
  DeleteBankingProductsComponent
} from "./banking-products/delete-banking-products/delete-banking-products.component";

const routes: Routes = [
  {
    path: 'bp/products',
    children: [
      { path: 'list', component: ListBankingProductsComponent },
      { path: 'create', component: FormBankingProductsComponent },
      { path: 'update', component: FormBankingProductsComponent },
      { path: 'delete', component: DeleteBankingProductsComponent }
    ]
  }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ModulosRoutingModule { }
