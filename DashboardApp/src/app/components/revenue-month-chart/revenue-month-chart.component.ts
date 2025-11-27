import { Component, computed } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ChartStyles } from '../../styles/chart-style';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-revenue-month-chart',
  imports: [CommonModule, ChartModule],
  templateUrl: './revenue-month-chart.component.html',
  styleUrl: './revenue-month-chart.component.scss',
})
export class RevenueMonthChartComponent {
  constructor(public apiService: ApiService) {}

  public barChartType: ChartType = 'bar';

  public barChartData = computed<ChartData<'bar'>>(() => {
    const finalData = this.apiService.lastCompleteYearData();

    return {
      labels: finalData.map((d) => d.month.split('_')[0].charAt(0).toUpperCase() + d.month.split('_')[0].slice(1)),
      datasets: [
        {
          data: finalData.map((d) => d.revenue),
          label: 'Revenue',
          borderColor: ChartStyles.colors.revenue.border,
          backgroundColor: ChartStyles.colors.revenue.point,
          //fill: 'origin',
          //tension: ChartStyles.commonOptions.tension,
        },
      ],
    };
  });

  public barChartOptions: ChartConfiguration['options'] = {
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
