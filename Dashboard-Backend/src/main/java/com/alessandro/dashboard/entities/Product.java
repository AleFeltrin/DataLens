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
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(precision = 19, scale = 2)
    private BigDecimal price;

    @Column(precision = 19, scale = 2)
    private BigDecimal expense;
 
    @ManyToMany(mappedBy = "products", fetch = FetchType.LAZY)
    private List<Transaction> transactions = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    public BigDecimal getPriceInDollars() {
        return price != null ? price.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public BigDecimal getExpenseInDollars() {
        return expense != null ? expense.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public void setPriceFromDollars(BigDecimal dollars) {
        this.price = dollars != null ? dollars.multiply(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public void setExpenseFromDollars(BigDecimal dollars) {
        this.expense = dollars != null ? dollars.multiply(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
}
