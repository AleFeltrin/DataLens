package com.alessandro.dashboard.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alessandro.dashboard.dtos.ProductDto;
import com.alessandro.dashboard.mappers.ProductMapper;
import com.alessandro.dashboard.repositories.ProductRepository;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@AllArgsConstructor
@RequestMapping("/products")
public class ProductController {
  private final ProductRepository productRepository;
  private final ProductMapper productMapper;
  
  @GetMapping
  public ResponseEntity<List<ProductDto>> getProducts(){

    List<ProductDto> productDtos = productRepository.findAll().stream().map(productMapper::toDto).collect(Collectors.toList());
    return ResponseEntity.ok(productDtos);
  }
}
