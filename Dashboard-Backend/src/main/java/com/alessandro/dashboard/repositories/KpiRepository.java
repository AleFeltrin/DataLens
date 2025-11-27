package com.alessandro.dashboard.repositories;

import com.alessandro.dashboard.entities.Kpi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KpiRepository extends JpaRepository<Kpi, Long> {
}
