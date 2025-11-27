import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { RevenuePredictionComponent } from '../components/revenue-prediction/revenue-prediction.component';

@Component({
  selector: 'app-predictions',
  imports: [RevenuePredictionComponent],
  templateUrl: './predictions.component.html',
  styleUrl: './predictions.component.scss',
})
export class PredictionsComponent {}
