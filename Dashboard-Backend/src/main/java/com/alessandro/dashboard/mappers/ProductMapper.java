package com.alessandro.dashboard.mappers;

import com.alessandro.dashboard.dtos.ProductDto;
import com.alessandro.dashboard.entities.Product;
import com.alessandro.dashboard.entities.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    
    @Mapping(target = "transactionIds", source = "transactions", qualifiedByName = "transactionsToIds")
    ProductDto toDto(Product product);
    
    @Named("transactionsToIds")
    default List<Long> transactionsToIds(List<Transaction> transactions) {
        return transactions.stream()
                .map(Transaction::getId)
                .collect(Collectors.toList());
    }
}
