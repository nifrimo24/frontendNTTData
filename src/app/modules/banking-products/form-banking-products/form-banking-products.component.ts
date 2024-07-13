import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {BankingProduct} from "../../../models/BankingProduct";
import {BankigProductsService} from "../../../services/bankig-products.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-form-banking-products',
  templateUrl: './form-banking-products.component.html',
  styleUrls: ['./form-banking-products.component.sass']
})
export class FormBankingProductsComponent implements OnInit {
  bankingProduct: BankingProduct | null = null;
  isUpdatePage: boolean = false;
  private bpSubscription!: Subscription;

  bankingProductForm = this.formBuilder.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    logo: ['', [Validators.required]],
    fechaLiberacion: ['', [Validators.required]],
    fechaRevision: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder,
              private bpService: BankigProductsService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.bankingProductForm.get('id')?.enable();

    this.bpSubscription = this.bpService.currentBankingProduct.subscribe(
      bankingProduct => this.bankingProduct = bankingProduct
    );

    if(this.bankingProduct != null)
      this.setBankingProductToUpdate();
  }

  ngOnDestroy() {
    this.bpSubscription.unsubscribe();
    this.bpService.ResetBankingProductToUpdate();
  }

  async saveOrUpdateBankingProducts(): Promise<void> {

    const bankingProduct: BankingProduct = {
      id: this.bankingProductForm.get("id")?.value ?? '',
      name: this.bankingProductForm.get("nombre")?.value ?? '',
      description: this.bankingProductForm.get("descripcion")?.value ?? '',
      logo: this.bankingProductForm.get("logo")?.value ?? '',
      date_release: this.bankingProductForm.get("fechaLiberacion")?.value ?? '',
      date_revision: this.bankingProductForm.get("fechaRevision")?.value ?? ''
    };

    const bankingProductResponse = this.isUpdatePage
      ? await this.bpService.UpdateBankingProduct(bankingProduct)
      : await this.bpService.CreateBankingProduct(bankingProduct);

    this.clearInputs();
    this.router.navigateByUrl('/bp/products/list');
  }

  clearInputs(): void {
    this.bankingProductForm.reset();
  }

  setBankingProductToUpdate() {
    this.bankingProductForm.get('id')?.disable();

    this.bankingProductForm.patchValue({
      id: this.bankingProduct?.id,
      nombre: this.bankingProduct?.name,
      descripcion: this.bankingProduct?.description,
      logo: this.bankingProduct?.logo,
      fechaLiberacion: this.bankingProduct?.date_release,
      fechaRevision: this.bankingProduct?.date_revision
    });

    this.isUpdatePage = true;
  }


}
