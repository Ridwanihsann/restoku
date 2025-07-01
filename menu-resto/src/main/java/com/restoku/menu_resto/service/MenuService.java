package com.restoku.menu_resto.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.restoku.menu_resto.model.Menu;
import com.restoku.menu_resto.repository.MenuRepository;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    // Mengambil path folder upload dari application.properties
    @Value("${file.upload-dir}")
    private String uploadDir;

    // Method helper untuk menyimpan file
    private String saveFile(MultipartFile file) {
        try {
            // Membuat nama file yang unik untuk menghindari duplikasi
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);

            // Membuat direktori jika belum ada
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Menyimpan file
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            // Membuat URL yang bisa diakses dari browser
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/uploads/")
                    .path(fileName)
                    .toUriString();

        } catch (IOException e) {
            throw new RuntimeException("Gagal menyimpan file: " + e.getMessage());
        }
    }

    // CREATE dengan file upload
    public Menu createMenu(Menu menu, MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            String fileUrl = saveFile(file);
            menu.setUrlGambar(fileUrl);
        }
        return menuRepository.save(menu);
    }

    // UPDATE dengan file upload
    public Menu updateMenu(Long id, Menu menuDetails, MultipartFile file) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu tidak ditemukan dengan id: " + id));

        menu.setNamaMenu(menuDetails.getNamaMenu());
        menu.setHarga(menuDetails.getHarga());
        menu.setDeskripsi(menuDetails.getDeskripsi());
        menu.setKategori(menuDetails.getKategori());

        if (file != null && !file.isEmpty()) {
            String fileUrl = saveFile(file);
            menu.setUrlGambar(fileUrl);
        }
        
        return menuRepository.save(menu);
    }

    // Method READ (semua)
    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }

    // Method READ (berdasarkan ID)
    public Optional<Menu> getMenuById(Long id) {
        return menuRepository.findById(id);
    }

    // Method DELETE
    public void deleteMenu(Long id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu tidak ditemukan dengan id: " + id));
        menuRepository.delete(menu);
    }
}
