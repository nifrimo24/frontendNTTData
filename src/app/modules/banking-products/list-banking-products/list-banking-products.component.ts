import { Component, OnInit } from '@angular/core';
import {BankingProduct} from "../../../models/BankingProduct";

@Component({
  selector: 'app-list-banking-products',
  templateUrl: './list-banking-products.component.html',
  styleUrls: ['./list-banking-products.component.sass']
})
export class ListBankingProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  bankingProducts: BankingProduct[] = [
    {
      name: 'Producto 1',
      description: 'Descripción del Producto 1',
      releaseDate: '01/01/2000',
      restructuringDate: '01/01/2001'
    },
    {
      name: 'Producto 2',
      description: 'Descripción del Producto 2',
      releaseDate: '01/01/2002',
      restructuringDate: '01/01/2003'
    },
    {
      name: 'Producto 3',
      description: 'Descripción del Producto 3',
      releaseDate: '01/01/2004',
      restructuringDate: '01/01/2005'
    },
    {
      name: 'Producto 4',
      description: 'Descripción del Producto 4',
      releaseDate: '01/01/2006',
      restructuringDate: '01/01/2007'
    }
  ];

  // Creamos una función para cambiar de página
  currentPage = 1;
  pages = [1, 2, 3, 4, 5];

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
