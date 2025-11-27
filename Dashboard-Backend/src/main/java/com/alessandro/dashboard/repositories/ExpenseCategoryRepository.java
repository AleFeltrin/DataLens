package com.alessandro.dashboard.repositories;

import com.alessandro.dashboard.entities.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> {
}
