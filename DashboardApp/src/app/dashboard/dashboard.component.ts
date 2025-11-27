import { Component, OnInit } from '@angular/core';
import { RevenueExpensesChartComponent } from '../components/revenue-expenses-chart/revenue-expenses-chart.component';
import { ApiService } from '../services/api.service';
import { ProfitRevenueChartComponent } from '../components/profit-revenue-chart/profit-revenue-chart.component';
import { RevenueMonthChartComponent } from '../components/revenue-month-chart/revenue-month-chart.component';
import { ProductPricesExpensesGraphComponent } from '../components/product-prices-expenses-graph/product-prices-expenses-graph.component';
import { ProductsListComponent } from '../components/products-list/products-list.component';
import { OrdersListComponent } from '../components/orders-list/orders-list.component';
import { ExpensesBreakdownComponent } from '../components/expenses-breakdown/expenses-breakdown.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    RevenueExpensesChartComponent,
    ProfitRevenueChartComponent,
    RevenueMonthChartComponent,
    ProductPricesExpensesGraphComponent,
    ProductsListComponent,
    OrdersListComponent,
    ExpensesBreakdownComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.loadingKpis();
    this.apiService.loadProducts();
    this.apiService.loadTransactions();
  }
}
