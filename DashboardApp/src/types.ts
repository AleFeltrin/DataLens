export interface Product {
  id: number;
  price: number;
  expense: number;
  transactionIds: number[];
  createdAt: string;
  updatedAt: string;
}
export interface Transaction {
  id: number;
  buyer: string;
  amount: number;
  productIds: number[];
  createdAt: string;
  updatedAt: string;
}
export interface Kpi {
  id: number;
  totalProfit: number;
  totalRevenue: number;
  totalExpenses: number;
  expensesByCategory: { [key: string]: number };
  monthlyData: MonthlyData[];
  dailyData: DailyData[];
  createdAt: string;
  updatedAt: string;
}
export interface MonthlyData {
  id: number;
  month: string;
  revenue: number;
  expenses: number;
  operationalExpenses: number;
  nonOperationalExpenses: number;
}
export interface DailyData {
  id: number;
  date: string;
  revenue: number;
  expenses: number;
}
