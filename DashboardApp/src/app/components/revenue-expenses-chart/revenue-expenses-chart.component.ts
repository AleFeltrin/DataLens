import { Component, computed } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { MonthlyData } from '../../../types';
import { ChartStyles } from '../../styles/chart-style';
@Component({
  selector: 'app-revenue-expenses-chart',
  imports: [CommonModule, ChartModule],
  templateUrl: './revenue-expenses-chart.component.html',
  styleUrl: './revenue-expenses-chart.component.scss',
})
export class RevenueExpensesChartComponent {
  constructor(public apiService: ApiService) {}

  // PrimeNG Chart
  public lineChartType: ChartType = 'line';

  public lineChartData = computed<ChartData<'line'>>(() => {
    const finalData = this.apiService.lastCompleteYearData();

    return {
      // asse x
      labels: finalData.map((d) => d.month.split('_')[0].charAt(0).toUpperCase() + d.month.split('_')[0].slice(1)),
      datasets: [
        {
          data: finalData.map((d) => d.revenue),
          label: 'Revenue',
          borderColor: ChartStyles.colors.revenue.border,
          backgroundColor: ChartStyles.colors.revenue.background,
          pointBackgroundColor: ChartStyles.colors.revenue.point,
          fill: 'origin', // area sotto linea
          tension: ChartStyles.commonOptions.tension,
        },
        {
          data: finalData.map((d) => d.expenses),
          label: 'Expenses',
          borderColor: ChartStyles.colors.expenses.border,
          backgroundColor: ChartStyles.colors.expenses.background,
          pointBackgroundColor: ChartStyles.colors.expenses.point,
          fill: 'origin',
          tension: ChartStyles.commonOptions.tension,
        },
      ],
    };
  });

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: ChartStyles.text.primary,
        },
      },
      y: {
        ticks: {
          callback: (value: any) => '$' + value,
          color: ChartStyles.text.primary,
        },
        beginAtZero: false,
      },
    },
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
