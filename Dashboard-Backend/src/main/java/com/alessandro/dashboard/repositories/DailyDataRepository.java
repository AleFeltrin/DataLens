package com.alessandro.dashboard.repositories;

import com.alessandro.dashboard.entities.DailyData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyDataRepository extends JpaRepository<DailyData, Long> {
}
