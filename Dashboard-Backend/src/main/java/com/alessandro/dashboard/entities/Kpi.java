package com.alessandro.dashboard.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "kpis")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Kpi {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "total_profit", precision = 19, scale = 2)
    private BigDecimal totalProfit;

    @Column(name = "total_revenue", precision = 19, scale = 2)
    private BigDecimal totalRevenue;

    @Column(name = "total_expenses", precision = 19, scale = 2)
    private BigDecimal totalExpenses;

    @OneToMany(mappedBy = "kpi", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<MonthlyData> monthlyData = new ArrayList<>();

    @OneToMany(mappedBy = "kpi", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DailyData> dailyData = new ArrayList<>();

    @OneToMany(mappedBy = "kpi", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ExpenseCategory> expensesByCategory = new ArrayList<>();
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    public BigDecimal getTotalProfitInDollars() {
        return totalProfit != null ? totalProfit.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public BigDecimal getTotalRevenueInDollars() {
        return totalRevenue != null ? totalRevenue.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public BigDecimal getTotalExpensesInDollars() {
        return totalExpenses != null ? totalExpenses.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public void setTotalProfitFromDollars(BigDecimal dollars) {
        this.totalProfit = dollars != null ? dollars.multiply(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public void setTotalRevenueFromDollars(BigDecimal dollars) {
        this.totalRevenue = dollars != null ? dollars.multiply(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public void setTotalExpensesFromDollars(BigDecimal dollars) {
        this.totalExpenses = dollars != null ? dollars.multiply(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public Map<String, BigDecimal> getExpensesByCategoryMap() {
        Map<String, BigDecimal> map = new HashMap<>();
        for (ExpenseCategory ec : expensesByCategory) {
            map.put(ec.getCategory(), ec.getAmountInDollars());
        }
        return map;
    }
    
    public void addMonthlyData(MonthlyData monthly) {
        monthlyData.add(monthly);
        monthly.setKpi(this);
    }
    
    public void addDailyData(DailyData daily) {
        dailyData.add(daily);
        daily.setKpi(this);
    }
    
    public void addExpenseCategory(String category, BigDecimal amount) {
        ExpenseCategory ec = new ExpenseCategory();
        ec.setCategory(category);
        ec.setAmount(amount);
        ec.setKpi(this);
        expensesByCategory.add(ec);
    }
}
