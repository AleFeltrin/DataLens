package com.alessandro.dashboard.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "expense_categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseCategory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String category;
    
    @Column(precision = 19, scale = 2)
    private BigDecimal amount;
    

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kpi_id", nullable = false)
    private Kpi kpi;
    
    public BigDecimal getAmountInDollars() {
        return amount != null ? amount.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public void setAmountFromDollars(BigDecimal dollars) {
        this.amount = dollars != null ? dollars.multiply(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
}
