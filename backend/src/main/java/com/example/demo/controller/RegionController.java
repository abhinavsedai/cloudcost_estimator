package com.example.demo.controller;

import com.example.demo.model.Region;
import com.example.demo.repository.RegionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/regions")
public class RegionController {

    private final RegionRepository regionRepository;

    public RegionController(RegionRepository regionRepository) {
        this.regionRepository = regionRepository;
    }

    @GetMapping
    public List<Region> getAllRegions() {
        return regionRepository.findAll();
    }
}