import { Component, computed } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ChartStyles } from '../../styles/chart-style';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-expenses-breakdown',
  imports: [ChartModule],
  templateUrl: './expenses-breakdown.component.html',
  styleUrl: './expenses-breakdown.component.scss',
})
export class ExpensesBreakdownComponent {
  constructor(public apiService: ApiService) {}

  // PrimeNG Chart
  public chartType: ChartType = 'doughnut';

  public chartData = computed<ChartData<'doughnut'>>(() => {
    const kpiData = this.apiService.kpis()[0];

    return {
      labels: Object.keys(kpiData.expensesByCategory),
      datasets: [
        {
          data: Object.values(kpiData.expensesByCategory),
          label: 'Expenses by Category',
          backgroundColor: [ChartStyles.colors.revenue.background, ChartStyles.colors.expenses.background, ChartStyles.colors.profit.background],
          borderColor: [ChartStyles.colors.revenue.border, ChartStyles.colors.expenses.border, ChartStyles.colors.profit.border],
        },
      ],
    };
  });

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: ChartStyles.text.primary,
          usePointStyle: true,
        },
      },
    },
  };
}
