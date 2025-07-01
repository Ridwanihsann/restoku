package com.restoku.menu_resto.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "detail_pesanan")
public class DetailPesanan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long menuId;
    private String namaMenu;
    private Integer kuantitas;
    private Double harga;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pesanan_id")
    @JsonIgnore // Mencegah infinite loop saat serialisasi JSON
    private Pesanan pesanan;
}
