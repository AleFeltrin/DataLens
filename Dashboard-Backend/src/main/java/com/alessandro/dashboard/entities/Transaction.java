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
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String buyer;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "transaction_products",
        joinColumns = @JoinColumn(name = "transaction_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    public BigDecimal getAmountInDollars() {
        return amount != null ? amount.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public void setAmountFromDollars(BigDecimal dollars) {
        this.amount = dollars != null ? dollars.multiply(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
    }
    
    public void addProduct(Product product) {
        this.products.add(product);
        product.getTransactions().add(this);
    }
    
    public void removeProduct(Product product) {
        this.products.remove(product);
        product.getTransactions().remove(this);
    }
}