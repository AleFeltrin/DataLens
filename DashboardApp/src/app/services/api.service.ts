import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kpi, MonthlyData, Product, Transaction } from '../../types';

const MONTHS_ORDER: { [key: string]: number } = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  kpis = signal<Kpi[]>([]);
  products = signal<Product[]>([]);
  transactions = signal<Transaction[]>([]);

  constructor(private http: HttpClient) {}

  public loadingKpis(): void {
    this.http.get<Kpi[]>(`${this.apiUrl}/kpis`).subscribe({
      next: (response) => {
        this.kpis.set(response);
      },
      error: (err) => {
        console.error('Errore Kpis:', err);
      },
    });
  }

  loadProducts(): void {
    this.http.get<Product[]>(`${this.apiUrl}/products`).subscribe({
      next: (response) => {
        this.products.set(response);
      },
      error: (err) => {
        console.error('Errore Products:', err);
      },
    });
  }

  loadTransactions(): void {
    this.http.get<Transaction[]>(`${this.apiUrl}/transactions`).subscribe({
      next: (response) => {
        this.transactions.set(response);
      },
      error: (err) => {
        console.error('Errore Transactions:', err);
      },
    });
  }

  private parseMonthKey(monthKey: string): { year: number; monthIndex: number; sortKey: number } {
    const parts = monthKey.split('_');
    if (parts.length !== 2) return { year: 0, monthIndex: 0, sortKey: 0 };

    const monthName = parts[0].toLowerCase();
    const year = parseInt(parts[1], 10) + 2000;
    const monthIndex = MONTHS_ORDER[monthName] || 0;

    const sortKey = year * 100 + monthIndex;
    return { year, monthIndex, sortKey };
  }

  private monthlyDataSignal = computed<MonthlyData[]>(() => {
    const kpis = this.kpis();
    return kpis.length > 0 ? kpis[0].monthlyData : [];
  });

  public lastCompleteYearData = computed<MonthlyData[]>(() => {
    const monthlyData = this.monthlyDataSignal();

    if (monthlyData.length < 12) return [];

    const sortableData = monthlyData.map((data) => {
      const { year, monthIndex, sortKey } = this.parseMonthKey(data.month);
      return { ...data, year, monthIndex, sortKey };
    });

    sortableData.sort((a, b) => a.sortKey - b.sortKey);

    const decemberMonths = sortableData.filter((data) => data.monthIndex === 12);
    const latestDecember = decemberMonths[decemberMonths.length - 1];

    if (!latestDecember) {
      return [];
    }

    const targetYear = latestDecember.year;

    const finalData = sortableData.filter((data) => data.year === targetYear && data.monthIndex > 0).sort((a, b) => a.monthIndex - b.monthIndex);

    return finalData.length === 12 ? finalData : [];
  });

  public monthlyProfitData = computed<({ profit: number } & MonthlyData)[]>(() => {
    return this.lastCompleteYearData().map((data) => ({
      ...data,
      profit: data.revenue - data.expenses,
    }));
  });

  public lastCompleteYearProfit = computed<number[]>(() => {
    return this.monthlyProfitData().map((data) => data.profit);
  });

  public recentOrders = computed<({ count: number } & Transaction)[]>(() => {
    return this.transactions().map((data) => ({
      ...data,
      count: data.productIds.length,
    }));
  });
}
