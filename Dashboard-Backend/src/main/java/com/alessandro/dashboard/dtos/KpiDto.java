package com.alessandro.dashboard.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Getter
public class KpiDto {
    private Long id;
    private BigDecimal totalProfit;
    private BigDecimal totalRevenue;
    private BigDecimal totalExpenses;
    private Map<String, BigDecimal> expensesByCategory;
    private List<MonthlyDataDto> monthlyData;
    private List<DailyDataDto> dailyData;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
