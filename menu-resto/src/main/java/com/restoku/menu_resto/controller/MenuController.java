package com.restoku.menu_resto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.restoku.menu_resto.model.Menu;
import com.restoku.menu_resto.service.MenuService;

@RestController
@RequestMapping("/api/v1/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    // Endpoint CREATE dengan Multipart-data
    @PostMapping
    public Menu createMenu(
        @RequestParam("namaMenu") String namaMenu,
        @RequestParam("harga") Double harga,
        @RequestParam("kategori") String kategori,
        @RequestParam(value = "deskripsi", required = false) String deskripsi,
        @RequestParam(value = "file", required = false) MultipartFile file) {
        
        Menu menu = new Menu();
        menu.setNamaMenu(namaMenu);
        menu.setHarga(harga);
        menu.setDeskripsi(deskripsi);
        menu.setKategori(kategori);

        return menuService.createMenu(menu, file);
    }

    // Endpoint UPDATE dengan Multipart-data
    @PutMapping("/{id}")
    public ResponseEntity<Menu> updateMenu(
        @PathVariable Long id,
        @RequestParam("namaMenu") String namaMenu,
        @RequestParam("harga") Double harga,
        @RequestParam("kategori") String kategori,
        @RequestParam(value = "deskripsi", required = false) String deskripsi,
        @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Menu menuDetails = new Menu();
            menuDetails.setNamaMenu(namaMenu);
            menuDetails.setHarga(harga);
            menuDetails.setDeskripsi(deskripsi);
            menuDetails.setKategori(kategori);
            return ResponseEntity.ok(menuService.updateMenu(id, menuDetails, file));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint READ (mendapatkan semua menu)
    @GetMapping
    public List<Menu> getAllMenus() {
        return menuService.getAllMenus();
    }

    // Endpoint READ (mendapatkan menu berdasarkan ID)
    @GetMapping("/{id}")
    public ResponseEntity<Menu> getMenuById(@PathVariable Long id) {
        return menuService.getMenuById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint untuk DELETE (menghapus menu berdasarkan ID)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        try {
            menuService.deleteMenu(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}