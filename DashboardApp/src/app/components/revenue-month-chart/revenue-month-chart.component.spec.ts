import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueMonthChartComponent } from './revenue-month-chart.component';

describe('RevenueMonthChartComponent', () => {
  let component: RevenueMonthChartComponent;
  let fixture: ComponentFixture<RevenueMonthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueMonthChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueMonthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
