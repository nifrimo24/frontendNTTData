import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListBankingProductsComponent} from "./banking-products/list-banking-products/list-banking-products.component";
import {FormBankingProductsComponent} from "./banking-products/form-banking-products/form-banking-products.component";

const routes: Routes = [
    { path: 'bp/products/list', component: ListBankingProductsComponent},
    { path: 'bp/products/create', component: FormBankingProductsComponent},
    { path: 'bp/products/update', component: FormBankingProductsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ModulosRoutingModule { }
