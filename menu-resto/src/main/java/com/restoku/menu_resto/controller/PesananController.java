package com.restoku.menu_resto.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restoku.menu_resto.dto.PesananRequestDto;
import com.restoku.menu_resto.model.Pesanan;
import com.restoku.menu_resto.service.PesananService;

@RestController
@RequestMapping("/api/v1/pesanan")
public class PesananController {
    @Autowired
    private PesananService pesananService;

    @PostMapping
    public Pesanan createPesanan(@RequestBody PesananRequestDto requestDto) {
        return pesananService.createPesanan(requestDto);
    }

    @GetMapping
    public List<Pesanan> getAllPesanan() {
        return pesananService.getAllPesanan();
    }
    
    @PutMapping("/{id}/status-pesanan")
    public Pesanan updateStatusPesanan(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        return pesananService.updateStatusPesanan(id, status);
    }

    @PutMapping("/{id}/status-pembayaran")
    public Pesanan updateStatusPembayaran(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        return pesananService.updateStatusPembayaran(id, status);
    }
}
