package com.example.demo.model;

import jakarta.persistence.*;
// import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "cost")
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
public class Cost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    @Column(name = "cost_per_unit", nullable = false)
    private BigDecimal costPerUnit;
}