import { Component, OnInit } from '@angular/core';
import {BankingProduct} from "../../../models/BankingProduct";
import {DeleteBankingProductsComponent} from "../delete-banking-products/delete-banking-products.component";
import {BankigProductsService} from "../../../services/bankig-products.service";

@Component({
  selector: 'app-list-banking-products',
  templateUrl: './list-banking-products.component.html',
  styleUrls: ['./list-banking-products.component.sass']
})
export class ListBankingProductsComponent implements OnInit {

  constructor(private bpService: BankigProductsService) {
    this.getAllBankingProducts();
  }

  ngOnInit(): void {
  }

  bankingProducts: BankingProduct[] = [];
  filteredBankingProducts: BankingProduct[] = [];

  async getAllBankingProducts() : Promise<void> {
    this.bankingProducts = await this.bpService.GetAllBankingProducts();
    this.filteredBankingProducts = [...this.bankingProducts];
  }

  filterProducts(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredBankingProducts = this.bankingProducts.filter(product => product.name.toLowerCase().includes(searchTerm));
  }

  addProduct() { }

  editProduct(product: BankingProduct) { }

  deleteProduct(product: BankingProduct) { }

}
