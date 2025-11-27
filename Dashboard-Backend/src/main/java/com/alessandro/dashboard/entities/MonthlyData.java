package com.alessandro.dashboard.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Entity
@Table(name = "monthly_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String month;

    @Column(precision = 19, scale = 2)
    private BigDecimal revenue;
 
    @Column(precision = 19, scale = 2)
    private BigDecimal expenses;

    @Column(name = "operational_expenses", precision = 19, scale = 2)
    private BigDecimal operationalExpenses;

    @Column(name = "non_operational_expenses", precision = 19, scale = 2)
    private BigDecimal nonOperationalExpenses;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kpi_id", nullable = false)
    private Kpi kpi;
    
    public BigDecimal getRevenueInDollars() {
        return revenue != null ? revenue.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public BigDecimal getExpensesInDollars() {
        return expenses != null ? expenses.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public BigDecimal getOperationalExpensesInDollars() {
        return operationalExpenses != null ? operationalExpenses.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public BigDecimal getNonOperationalExpensesInDollars() {
        return nonOperationalExpenses != null ? nonOperationalExpenses.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
}
