package com.restoku.menu_resto.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity; // Lombok untuk membuat getter, setter, dll. otomatis
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity // Menandakan class ini adalah sebuah entitas/tabel database
@Table(name = "menu")
public class Menu {

    @Id // Menandakan ini adalah Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID akan dibuat otomatis oleh database
    private Long id;

    @Column(nullable = false)
    private String namaMenu;

    @Column(nullable = false)
    private Double harga;

    private String deskripsi;

    private String urlGambar;

    @Column(nullable = false)
    private String kategori;
}