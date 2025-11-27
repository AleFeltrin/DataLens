import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueExpensesChartComponent } from './revenue-expenses-chart.component';

describe('RevenueExpensesChartComponent', () => {
  let component: RevenueExpensesChartComponent;
  let fixture: ComponentFixture<RevenueExpensesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueExpensesChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RevenueExpensesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
