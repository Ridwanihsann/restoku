package com.restoku.menu_resto.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.restoku.menu_resto.dto.PesananRequestDto;
import com.restoku.menu_resto.model.DetailPesanan;
import com.restoku.menu_resto.model.Pesanan;
import com.restoku.menu_resto.repository.PesananRepository;

@Service
public class PesananService {
    @Autowired
    private PesananRepository pesananRepository;

    @Transactional
    public Pesanan createPesanan(PesananRequestDto requestDto) {
        Pesanan pesanan = new Pesanan();
        pesanan.setNomorMeja(requestDto.getNomorMeja());
        pesanan.setNamaPemesan(requestDto.getNamaPemesan());
        pesanan.setNoHandphone(requestDto.getNoHandphone());
        pesanan.setStatusPesanan("Diterima");
        pesanan.setStatusPembayaran("Belum Bayar");
        pesanan.setWaktuPesan(LocalDateTime.now());
        
        List<DetailPesanan> detailPesanans = new ArrayList<>();
        double totalHarga = 0.0;

        for (var itemDto : requestDto.getItems()) {
            DetailPesanan detail = new DetailPesanan();
            detail.setMenuId(itemDto.getId());
            detail.setNamaMenu(itemDto.getNamaMenu());
            detail.setKuantitas(itemDto.getKuantitas());
            detail.setHarga(itemDto.getHarga());
            detail.setPesanan(pesanan);
            detailPesanans.add(detail);
            
            totalHarga += itemDto.getHarga() * itemDto.getKuantitas();
        }
        
        pesanan.setDetailPesanans(detailPesanans);
        pesanan.setTotalHarga(totalHarga);

        return pesananRepository.save(pesanan);
    }

    public List<Pesanan> getAllPesanan() {
        return pesananRepository.findAll();
    }

    // (PEMBARUAN) Menambahkan @Transactional untuk memastikan operasi update berjalan dalam satu transaksi.
    @Transactional
    public Pesanan updateStatusPesanan(Long id, String status) {
        Pesanan pesanan = pesananRepository.findById(id).orElseThrow(() -> new RuntimeException("Pesanan tidak ditemukan"));
        pesanan.setStatusPesanan(status);
        return pesananRepository.save(pesanan);
    }

    // (PEMBARUAN) Menambahkan @Transactional untuk memastikan operasi update berjalan dalam satu transaksi.
    @Transactional
    public Pesanan updateStatusPembayaran(Long id, String status) {
        Pesanan pesanan = pesananRepository.findById(id).orElseThrow(() -> new RuntimeException("Pesanan tidak ditemukan"));
        pesanan.setStatusPembayaran(status);
        return pesananRepository.save(pesanan);
    }
}
