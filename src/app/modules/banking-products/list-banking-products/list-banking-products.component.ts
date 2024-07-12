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
  currentPage = 1;
  pages = [1, 2, 3, 4, 5];


  async getAllBankingProducts() {
    this.bankingProducts = await this.bpService.GetAllBankingProducts();
   console.log('allBankingProducts', this.bankingProducts)

  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  addProduct() {
    // Implementa la lógica para agregar un producto
  }

  editProduct(product: BankingProduct) {
    // Implementa la lógica para editar un producto
  }

  deleteProduct(product: BankingProduct) {
    // Implementa la lógica para eliminar un producto
  }

}
