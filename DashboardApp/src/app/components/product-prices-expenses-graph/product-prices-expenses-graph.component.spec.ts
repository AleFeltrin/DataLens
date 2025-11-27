import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPricesExpensesGraphComponent } from './product-prices-expenses-graph.component';

describe('ProductPricesExpensesGraphComponent', () => {
  let component: ProductPricesExpensesGraphComponent;
  let fixture: ComponentFixture<ProductPricesExpensesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPricesExpensesGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPricesExpensesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
