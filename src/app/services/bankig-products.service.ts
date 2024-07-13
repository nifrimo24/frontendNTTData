import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BankingProduct} from "../models/BankingProduct";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {BankingProductsResponse} from "../utils/APIResponse";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankigProductsService {
  private bankingProductSource = new BehaviorSubject<BankingProduct | null>(null);

  currentBankingProduct = this.bankingProductSource.asObservable();
  urlBankingProductsAPI: string = environment.urlLocal;

  constructor(private http: HttpClient) { }

  private async getResponse(request: Observable<any>) {
    try {
      return [await lastValueFrom(request), null];
    } catch (_) {
      return [null, _];
    }
  }

  async getAllBankingProducts() : Promise<BankingProduct[]> {
    const urlGetAllBankingProducts = `${this.urlBankingProductsAPI}bp/products`;
    return (await this.getResponse(this.http.get<BankingProductsResponse>(urlGetAllBankingProducts)))[0].data;
  }

  async createBankingProduct(newBankingProduct: BankingProduct) : Promise<BankingProduct> {
    const urlCreateBankingProduct = `${this.urlBankingProductsAPI}bp/products`;
    return (await this.getResponse(this.http.post<BankingProductsResponse>(urlCreateBankingProduct, newBankingProduct)))[0].data;
  }

  async deleteBankingProduct(bankingProductId: string) : Promise<string> {
    const urlDeleteBankingProduct = `${this.urlBankingProductsAPI}bp/products/${bankingProductId}`;
    return (await this.getResponse(this.http.delete<BankingProductsResponse>(urlDeleteBankingProduct)))[0].message;
  }

  async updateBankingProduct(bankingProduct: BankingProduct) : Promise<BankingProduct> {
    const urlUpdateBankingProduct = `${this.urlBankingProductsAPI}bp/products/${bankingProduct.id}`;
    return (await this.getResponse(this.http.put<BankingProductsResponse>(urlUpdateBankingProduct, bankingProduct)))[0].data;
  }

  async verifyBankingProduct(bankingProductId: string) : Promise<boolean> {
    const urlVerifyBankingProduct = `${this.urlBankingProductsAPI}bp/products/verification/${bankingProductId}`;
    return (await this.getResponse(this.http.get<boolean>(urlVerifyBankingProduct)))[0];
  }

  setBankingProductToUpdate(bankingProductToUpdate: BankingProduct) {
    this.bankingProductSource.next(bankingProductToUpdate);
  }

  resetBankingProductToUpdate() {
    this.bankingProductSource.next(null);
  }


}
