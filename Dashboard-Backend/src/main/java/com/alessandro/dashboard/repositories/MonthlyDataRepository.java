package com.alessandro.dashboard.repositories;

import com.alessandro.dashboard.entities.MonthlyData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonthlyDataRepository extends JpaRepository<MonthlyData, Long> {
}
