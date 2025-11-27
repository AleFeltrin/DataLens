package com.alessandro.dashboard.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Getter
public class ProductDto {
    private Long id;
    private BigDecimal price;
    private BigDecimal expense;
    private List<Long> transactionIds;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
