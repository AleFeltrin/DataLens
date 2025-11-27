package com.alessandro.dashboard.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "daily_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String date;
    
    @Column(precision = 19, scale = 2)
    private BigDecimal revenue;
 
    @Column(precision = 19, scale = 2)
    private BigDecimal expenses;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kpi_id", nullable = false)
    private Kpi kpi;
    
    public BigDecimal getRevenueInDollars() {
        return revenue != null ? revenue.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public BigDecimal getExpensesInDollars() {
        return expenses != null ? expenses.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
}
