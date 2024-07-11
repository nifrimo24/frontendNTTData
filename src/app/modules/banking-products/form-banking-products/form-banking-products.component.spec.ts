import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBankingProductsComponent } from './form-banking-products.component';

describe('FormBankingProductsComponent', () => {
  let component: FormBankingProductsComponent;
  let fixture: ComponentFixture<FormBankingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBankingProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBankingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
