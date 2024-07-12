import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {BankingProduct} from "../../../models/BankingProduct";
@Component({
  selector: 'app-form-banking-products',
  templateUrl: './form-banking-products.component.html',
  styleUrls: ['./form-banking-products.component.sass']
})
export class FormBankingProductsComponent implements OnInit {

  bankingProductForm = this.formBuilder.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    logo: ['', [Validators.required]],
    fechaLiberacion: ['', [Validators.required]],
    fechaRevision: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  buildBankingProducts(): void {

    const bankingProduct: BankingProduct = {
      id: this.bankingProductForm.get("id")?.value ?? '',
      name: this.bankingProductForm.get("nombre")?.value ?? '',
      description: this.bankingProductForm.get("descripcion")?.value ?? '',
      logo: this.bankingProductForm.get("logo")?.value ?? '',
      date_release: this.bankingProductForm.get("fechaLiberacion")?.value ?? '',
      date_revision: this.bankingProductForm.get("fechaRevision")?.value ?? ''
    };

    console.log('Banking Products', bankingProduct);
  }

}
