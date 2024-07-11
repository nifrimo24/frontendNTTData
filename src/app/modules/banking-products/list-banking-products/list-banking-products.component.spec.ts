import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBankingProductsComponent } from './list-banking-products.component';

describe('ListBankingProductsComponent', () => {
  let component: ListBankingProductsComponent;
  let fixture: ComponentFixture<ListBankingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBankingProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBankingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
