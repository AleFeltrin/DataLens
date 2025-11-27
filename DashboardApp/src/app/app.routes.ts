import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PredictionsComponent } from './predictions/predictions.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'predictions', component: PredictionsComponent },
];
