package com.alessandro.dashboard.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Getter
public class TransactionDto {
    private Long id;
    private String buyer;
    private BigDecimal amount;
    private List<Long> productIds;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
