import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModulosRoutingModule} from "./modules/modulos.routing";

const routes: Routes = [
  {path:'**',redirectTo:'/bp/products/list'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ModulosRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
