import { Component, computed } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ChartConfiguration, ChartData, ChartType, TooltipItem } from 'chart.js';
import { ChartStyles } from '../../styles/chart-style';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-product-prices-expenses-graph',
  imports: [CommonModule, ChartModule],
  templateUrl: './product-prices-expenses-graph.component.html',
  styleUrl: './product-prices-expenses-graph.component.scss',
})
export class ProductPricesExpensesGraphComponent {
  constructor(public apiService: ApiService) {}

  public scatterChartType: ChartType = 'scatter';

  public scatterChartData = computed<ChartData<'scatter'>>(() => {
    const products = this.apiService.products();

    return {
      datasets: [
        {
          label: 'Price vs Cost',
          data: products.map((product) => ({
            x: product.price,
            y: product.expense,
          })),
          backgroundColor: ChartStyles.colors.product.background,
          borderColor: ChartStyles.colors.product.border,
          pointBackgroundColor: ChartStyles.colors.product.point,
          pointBorderColor: ChartStyles.colors.product.border,
          pointRadius: ChartStyles.commonOptions.pointRadius || 6,
          pointHoverRadius: ChartStyles.commonOptions.pointHoverRadius || 8,
          pointStyle: 'circle',
        },
      ],
    };
  });

  public scatterChartOptions: ChartConfiguration<'scatter'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Product Prices',
          color: ChartStyles.text.primary,
          font: {
            //weight: 'bold',
            size: 14,
          },
        },
        grid: {
          display: true,
        },
        beginAtZero: false,
        ticks: {
          callback: function (value: any) {
            return `$${value}`;
          },
          color: ChartStyles.text.primary,
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Expenses',
          color: ChartStyles.text.primary,
          font: {
            //weight: 'bold',
            size: 14,
          },
        },
        grid: {
          display: true,
        },
        beginAtZero: false,
        ticks: {
          callback: function (value: any) {
            return `$${value}`;
          },
          color: ChartStyles.text.primary,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: ChartStyles.text.primary,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'scatter'>) {
            const point = context.parsed;
            return `Price: $${point.x}, Cost: $${point.y}`;
          },
        },
      },
    },
  };
}
