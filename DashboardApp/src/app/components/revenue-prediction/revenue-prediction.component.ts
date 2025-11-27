import { Component, computed, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { MonthlyData } from '../../../types';
import regression from 'regression';
import { ChartStyles } from '../../styles/chart-style';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-revenue-prediction',
  imports: [CommonModule, ChartModule, ButtonModule],
  templateUrl: './revenue-prediction.component.html',
  styleUrl: './revenue-prediction.component.scss',
})
export class RevenuePredictionComponent {
  constructor(public apiService: ApiService) {}

  public showPrediction = signal<boolean>(false);
  public chartType: ChartType = 'line';

  public chartData = computed<ChartData<'line'>>(() => {
    const finalData: MonthlyData[] = this.apiService.lastCompleteYearData();
    const isPredictionActive = this.showPrediction();

    const pointsForRegression = finalData.map((d, index) => [index, d.revenue]);

    const result = regression.linear(pointsForRegression as [number, number][]);
    const m = result.equation[0]; // Slope
    const c = result.equation[1]; // Y-Intercept

    const regressionYValues = result.points.map((point) => point[1]);

    const datasets: any[] = [
      {
        label: 'Revenue',
        data: finalData.map((d) => d.revenue),
        borderColor: ChartStyles.colors.revenue.border,
        backgroundColor: ChartStyles.colors.revenue.point,
        type: 'line',
        showLine: false,
        pointRadius: 6,
        pointHoverRadius: 8,
        order: 2,
      },
      {
        label: 'Trend',
        data: regressionYValues,
        borderColor: ChartStyles.colors.expenses.border,
        backgroundColor: 'transparent',
        type: 'line',
        borderWidth: 2,
        pointRadius: 0,
        borderDash: [5, 5],
        tension: 0,
        order: 3,
      },
    ];

    if (isPredictionActive) {
      const predictedData = finalData.map((_, x) => m * (x + 12) + c);

      datasets.push({
        label: 'Predicted Revenue',
        data: predictedData,
        borderColor: ChartStyles.colors.profit.border,
        backgroundColor: ChartStyles.colors.profit.point,
        type: 'line',
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0,
        order: 1,
      });
    }
    return {
      labels: finalData.map((d) => d.month.split('_')[0].charAt(0).toUpperCase() + d.month.split('_')[0].slice(1)),
      datasets: datasets,
    };
  });

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: ChartStyles.text.primary },
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value: any) => '$' + value,
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
        },
      },
    },
  };
}
