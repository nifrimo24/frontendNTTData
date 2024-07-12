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
  totalBankingProducts: number = 0;
  selectedBankingProduct: number = 0;
  bankingProductsPerPage: number[] = [];

  async getAllBankingProducts() : Promise<void> {
    this.bankingProducts = await this.bpService.GetAllBankingProducts();
    this.filteredBankingProducts = [...this.bankingProducts];
    this.totalBankingProducts = this.filteredBankingProducts.length;

    if(this.totalBankingProducts >= 5)
      this.calculateRegistersPerPage(this.totalBankingProducts);
  }

  filterProducts(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredBankingProducts = this.bankingProducts.filter(product => product.name.toLowerCase().includes(searchTerm));
    this.totalBankingProducts = this.filteredBankingProducts.length;

    if(this.totalBankingProducts >= 5)
      this.calculateRegistersPerPage(this.totalBankingProducts);
  }

  calculateRegistersPerPage(totalRecord: number): void {
    const pages = Math.ceil(this.totalBankingProducts / 5);

    for(let i = 1; i <= pages; i++) {
      this.bankingProductsPerPage.push(i * 5);
    }

    this.selectedBankingProduct = this.bankingProductsPerPage[0];
  }

  addProduct() { }

  editProduct(product: BankingProduct) { }

  deleteProduct(product: BankingProduct) { }

}
