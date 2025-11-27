package com.alessandro.dashboard.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.math.BigDecimal;

@AllArgsConstructor
@Getter
public class MonthlyDataDto {
    private Long id;
    private String month;
    private BigDecimal revenue;
    private BigDecimal expenses;
    private BigDecimal operationalExpenses;
    private BigDecimal nonOperationalExpenses;
}
