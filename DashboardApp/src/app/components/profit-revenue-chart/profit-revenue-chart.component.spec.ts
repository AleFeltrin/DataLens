import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitRevenueChartComponent } from './profit-revenue-chart.component';

describe('ProfitRevenueChartComponent', () => {
  let component: ProfitRevenueChartComponent;
  let fixture: ComponentFixture<ProfitRevenueChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfitRevenueChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfitRevenueChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
