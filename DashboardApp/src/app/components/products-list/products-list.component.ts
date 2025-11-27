import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from '../../../types';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, TableModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  constructor(public apiService: ApiService) {}

  public get products(): Product[] {
    return this.apiService.products();
  }
}
