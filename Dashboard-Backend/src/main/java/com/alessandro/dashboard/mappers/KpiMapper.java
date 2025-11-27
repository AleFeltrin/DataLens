package com.alessandro.dashboard.mappers;

import com.alessandro.dashboard.dtos.KpiDto;
import com.alessandro.dashboard.dtos.MonthlyDataDto;
import com.alessandro.dashboard.dtos.DailyDataDto;
import com.alessandro.dashboard.entities.Kpi;
import com.alessandro.dashboard.entities.MonthlyData;
import com.alessandro.dashboard.entities.DailyData;
import com.alessandro.dashboard.entities.ExpenseCategory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface KpiMapper {
    
    @Mapping(target = "expensesByCategory", source = "expensesByCategory", qualifiedByName = "expensesToMap")
    KpiDto toDto(Kpi kpi);
    
    MonthlyDataDto toDto(MonthlyData monthlyData);
    
    DailyDataDto toDto(DailyData dailyData);
    
    @Named("expensesToMap")
    default Map<String, BigDecimal> expensesToMap(List<ExpenseCategory> expenses) {
        return expenses.stream()
                .collect(Collectors.toMap(
                        ExpenseCategory::getCategory,
                        ExpenseCategory::getAmount
                ));
    }
}
