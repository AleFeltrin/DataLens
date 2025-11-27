package com.alessandro.dashboard.controllers;

import com.alessandro.dashboard.dtos.KpiDto;
import com.alessandro.dashboard.entities.Kpi;
import com.alessandro.dashboard.mappers.KpiMapper;
import com.alessandro.dashboard.repositories.KpiRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/kpis")
public class KpiController {

  private final KpiRepository kpiRepository;
  private final KpiMapper kpiMapper;

  @GetMapping
    public ResponseEntity<List<KpiDto>> getKpis() {

        List<Kpi> kpis = kpiRepository.findAll();

        List<KpiDto> kpiDtos = kpis.stream()
                .map(kpiMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(kpiDtos);
    }
  
}
