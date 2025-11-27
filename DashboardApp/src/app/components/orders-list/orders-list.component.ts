import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Transaction } from '../../../types';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  imports: [CommonModule, TableModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent {
  constructor(public apiService: ApiService) {}

  public get orders(): Transaction[] {
    return this.apiService.recentOrders();
  }
}
