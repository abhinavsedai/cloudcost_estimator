package com.example.demo.model;

import jakarta.persistence.*;
// import lombok.*;

@Entity
@Table(name = "region")
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
public class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "region_code", unique = true, nullable = false)
    private String regionCode;

    @Column(name = "region_name", nullable = false)
    private String regionName;
}