import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BankingProduct} from "../models/BankingProduct";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {BankingProductsResponse} from "../utils/APIResponse";

@Injectable({
  providedIn: 'root'
})
export class BankigProductsService {

  urlBankingProductsAPI: string = environment.urlLocal;

  constructor(private http: HttpClient) { }

  private async getResponse(request: Observable<any>) {
    try {
      return [await lastValueFrom(request), null];
    } catch (_) {
      return [null, _];
    }
  }

  async GetAllBankingProducts() : Promise<BankingProduct[]> {
    const urlGetAllBankingProducts = `${this.urlBankingProductsAPI}bp/products`;
    return (await this.getResponse(this.http.get<BankingProductsResponse>(urlGetAllBankingProducts)))[0].data;
  }

  async CreateBankingProduct(newBankingProduct: BankingProduct) : Promise<BankingProduct> {
    const urlCreateBankingProduct = `${this.urlBankingProductsAPI}bp/products`;
    return (await this.getResponse(this.http.post<BankingProductsResponse>(urlCreateBankingProduct, newBankingProduct)))[0].data;
  }


}
