package com.alessandro.dashboard.repositories;

import com.alessandro.dashboard.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
