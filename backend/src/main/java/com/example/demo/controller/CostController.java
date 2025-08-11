package com.example.demo.controller;

import com.example.demo.model.Cost;
import com.example.demo.repository.CostRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/costs")
public class CostController {

    private final CostRepository costRepository;

    public CostController(CostRepository costRepository) {
        this.costRepository = costRepository;
    }

    @GetMapping
    public List<Cost> getAllCosts() {
        return costRepository.findAll();
    }
}