package com.alessandro.dashboard.controllers;

import com.alessandro.dashboard.dtos.TransactionDto;
import com.alessandro.dashboard.entities.Transaction;
import com.alessandro.dashboard.mappers.TransactionMapper;
import com.alessandro.dashboard.repositories.TransactionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/transactions")
public class TransactionController {

  private final TransactionRepository transactionRepository;
  private final TransactionMapper transactionMapper;

  @GetMapping
    public ResponseEntity<List<TransactionDto>> getTransactions() {
        
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt"); 
        
        Pageable pageable = PageRequest.of(0, 50, sort);

        Page<Transaction> transactionPage = transactionRepository.findAll(pageable);

        List<TransactionDto> transactionDtos = transactionPage.getContent().stream()
                .map(transactionMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(transactionDtos);
    }
  
}
