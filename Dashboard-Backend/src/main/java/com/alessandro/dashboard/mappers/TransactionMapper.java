package com.alessandro.dashboard.mappers;

import com.alessandro.dashboard.dtos.TransactionDto;
import com.alessandro.dashboard.entities.Transaction;
import com.alessandro.dashboard.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    
    @Mapping(target = "productIds", source = "products", qualifiedByName = "productsToIds")
    TransactionDto toDto(Transaction transaction);
    
    @Named("productsToIds")
    default List<Long> productsToIds(List<Product> products) {
        return products.stream()
                .map(Product::getId)
                .collect(Collectors.toList());
    }
}
