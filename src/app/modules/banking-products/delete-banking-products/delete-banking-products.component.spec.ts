import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBankingProductsComponent } from './delete-banking-products.component';

describe('DeleteBankingProductsComponent', () => {
  let component: DeleteBankingProductsComponent;
  let fixture: ComponentFixture<DeleteBankingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBankingProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBankingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
