import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {BankingProduct} from "../../../models/BankingProduct";
import {BankigProductsService} from "../../../services/bankig-products.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-form-banking-products',
  templateUrl: './form-banking-products.component.html',
  styleUrls: ['./form-banking-products.component.sass']
})
export class FormBankingProductsComponent implements OnInit {
  private bpSubscription!: Subscription;

  bankingProduct: BankingProduct | null = null;
  isUpdatePage: boolean = false;
  verifyBankingProduct: boolean = false;
  today: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

  bankingProductForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required]],
    fechaLiberacion: ['', [Validators.required]],
    fechaRevision: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder,
              private bpService: BankigProductsService,
              private router: Router
  ) {
    this.bankingProductForm.controls.fechaLiberacion.valueChanges.subscribe(value => {
      if (value) {
        const date = new Date(value);
        date.setFullYear(date.getFullYear() + 1);
        this.bankingProductForm.controls.fechaRevision.setValue(date.toISOString().split('T')[0]);
      }
    });
  }

  ngOnInit(): void {
    this.bankingProductForm.get('id')?.enable();
    this.bankingProductForm.get('fechaRevision')?.disable();

    this.bpSubscription = this.bpService.currentBankingProduct.subscribe(
      bankingProduct => this.bankingProduct = bankingProduct
    );

    if(this.bankingProduct != null)
      this.setBankingProductToUpdate();
  }

  ngOnDestroy() {
    this.bpSubscription.unsubscribe();
    this.bpService.resetBankingProductToUpdate();
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
      ? await this.bpService.updateBankingProduct(bankingProduct)
      : await this.bpService.createBankingProduct(bankingProduct);

    this.clearInputs();
    this.router.navigateByUrl('/bp/products/list');
  }

  clearInputs(): void {
    this.bankingProductForm.reset();
  }

  canSubmit(): boolean {
    return this.bankingProductForm.valid && !this.verifyBankingProduct;
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

  async veifyBankigProduct() {
    const id = this.bankingProductForm.get('id')?.value;
    if (id) {
      console.log('this.id', id)
      const exists = await this.bpService.verifyBankingProduct(id);
      console.log('this.exists', exists)
      if (exists) {
        this.verifyBankingProduct = true;
      }else{
        this.verifyBankingProduct = false;
      }
    }
    console.log('this.verifyBankingProduct', this.verifyBankingProduct)
  }

}
