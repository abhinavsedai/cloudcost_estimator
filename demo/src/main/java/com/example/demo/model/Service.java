package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services")
@Data
// @NoArgsConstructor
// @AllArgsConstructor
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "resource_type", unique = true, nullable = false)
    private String resourceType;
}