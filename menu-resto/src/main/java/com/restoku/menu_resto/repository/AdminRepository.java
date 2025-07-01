package com.restoku.menu_resto.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restoku.menu_resto.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);
}