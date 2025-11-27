import { Component, computed } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ChartStyles } from '../../styles/chart-style';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-profit-revenue-chart',
  imports: [CommonModule, ChartModule],
  templateUrl: './profit-revenue-chart.component.html',
  styleUrl: './profit-revenue-chart.component.scss',
})
export class ProfitRevenueChartComponent {
  constructor(public apiService: ApiService) {}

  // PrimeNG Chart
  public lineChartType: ChartType = 'line';

  public lineChartData = computed<ChartData<'line'>>(() => {
    const finalData = this.apiService.lastCompleteYearData();
    const profitData = this.apiService.lastCompleteYearProfit();

    return {
      //label asse x
      labels: finalData.map(
        (d) =>
          // Formattazione mese
          d.month.split('_')[0].charAt(0).toUpperCase() + d.month.split('_')[0].slice(1)
      ),
      datasets: [
        {
          data: profitData,
          label: 'Profit',
          borderColor: ChartStyles.colors.profit.border,
          backgroundColor: ChartStyles.colors.profit.background,
          pointBackgroundColor: ChartStyles.colors.profit.point,
          //fill: 'origin',
          tension: ChartStyles.commonOptions.tension,
        },
        {
          data: finalData.map((d) => d.revenue),
          label: 'Revenue',
          borderColor: ChartStyles.colors.revenue.border,
          backgroundColor: ChartStyles.colors.revenue.background,
          pointBackgroundColor: ChartStyles.colors.revenue.point,
          //fill: 'origin',
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
