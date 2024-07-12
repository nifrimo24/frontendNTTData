import {BankingProduct} from "../models/BankingProduct";

export interface BankingProductsResponse {
  message?: string
  data: BankingProduct[]
}

