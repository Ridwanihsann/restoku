package com.restoku.menu_resto.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "pesanan")
public class Pesanan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomorMeja;
    
    @Column(nullable = false)
    private String namaPemesan;

    private String noHandphone;

    private Double totalHarga;
    
    private String statusPesanan; // Contoh: "Diterima", "Disiapkan", "Selesai"
    
    private String statusPembayaran; // Contoh: "Belum Bayar", "Lunas"

    private LocalDateTime waktuPesan;

    // (PEMBARUAN) Mengubah FetchType menjadi LAZY untuk performa yang lebih baik dan mencegah error saat update.
    @OneToMany(mappedBy = "pesanan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DetailPesanan> detailPesanans;
}
