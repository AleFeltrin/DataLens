package com.alessandro.dashboard.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.math.BigDecimal;

@AllArgsConstructor
@Getter
public class DailyDataDto {
    private Long id;
    private String date;
    private BigDecimal revenue;
    private BigDecimal expenses;
}
