import { Component, OnInit } from '@angular/core';
import {BankingProduct} from "../../../models/BankingProduct";
import {DeleteBankingProductsComponent} from "../delete-banking-products/delete-banking-products.component";
import {BankigProductsService} from "../../../services/bankig-products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-banking-products',
  templateUrl: './list-banking-products.component.html',
  styleUrls: ['./list-banking-products.component.sass']
})
export class ListBankingProductsComponent implements OnInit {

  constructor(private bpService: BankigProductsService,
              private router: Router
  ) {
    this.getAllBankingProducts();
  }

  ngOnInit(): void {
  }

  bankingProducts: BankingProduct[] = [];
  filteredBankingProducts: BankingProduct[] = [];
  totalBankingProducts: number = 0;
  selectedBankingProduct: number = 0;
  bankingProductsPerPage: number[] = [];
  bankingProductsPerPageEnabled: boolean = false;
  searchTerm: any;
  selectedBankingProductToDelete: BankingProduct | null = null;
  deletedBankingProductId: string = "";

  async getAllBankingProducts() : Promise<void> {
    this.bankingProducts = await this.bpService.GetAllBankingProducts();
    this.filteredBankingProducts = [...this.bankingProducts];
    this.totalBankingProducts = this.filteredBankingProducts.length;

    this.bankingProductsPerPageEnabled = this.totalBankingProducts >= 5 ? true : false;

    if(this.totalBankingProducts >= 5)
      this.calculateRegistersPerPage(this.totalBankingProducts);
  }

  filterProducts(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredBankingProducts = this.bankingProducts.filter(product => product.name.toLowerCase().includes(this.searchTerm));
    this.totalBankingProducts = this.filteredBankingProducts.length;

    this.bankingProductsPerPageEnabled = this.totalBankingProducts >= 5 ? true : false;

    if(this.totalBankingProducts >= 5)
      this.calculateRegistersPerPage(this.totalBankingProducts);
  }

  calculateRegistersPerPage(totalRecord: number): void {
    const pages = Math.ceil(this.totalBankingProducts / 5);
    this.bankingProductsPerPage = [];

    for(let i = 1; i <= pages; i++) {
      this.bankingProductsPerPage.push(i * 5);
    }

    this.selectedBankingProduct = this.bankingProductsPerPage[0];
    this.filteredBankingProducts = this.filteredBankingProducts.slice(0, this.selectedBankingProduct);
  }

  onBankingProductChange() {
    this.filteredBankingProducts = this.bankingProducts
      .filter(product => product.name.toLowerCase().includes(this.searchTerm))
      .slice(0, this.selectedBankingProduct);
  }

  updateBankingProduct(bankingProduct: BankingProduct) {
    this.bpService.SetBankingProductToUpdate(bankingProduct);
    this.router.navigate(['/bp/products/update']);
  }

  deleteBankingProduct(bankingProduct: BankingProduct): void {
    this.selectedBankingProductToDelete = bankingProduct;
  }

  async confirmDelete(): Promise<void> {
    if (this.selectedBankingProductToDelete)
      this.deletedBankingProductId = await this.bpService.DeleteBankingProduct(this.selectedBankingProductToDelete.id);

    this.getAllBankingProducts();
    console.log(`Deleted product: ${this.deletedBankingProductId}`);
    this.selectedBankingProductToDelete = null;
  }

  cancelDelete(): void {
    this.selectedBankingProductToDelete = null;
  }
}
