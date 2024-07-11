import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListBankingProductsComponent} from "./banking-products/list-banking-products/list-banking-products.component";

const routes: Routes = [
    { path: 'bp/products', component: ListBankingProductsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ModulosRoutingModule { }
