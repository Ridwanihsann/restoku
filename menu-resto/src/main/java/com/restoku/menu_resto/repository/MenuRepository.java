package com.restoku.menu_resto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restoku.menu_resto.model.Menu;

// JpaRepository<TipeEntity, TipePrimaryKey>
// Dengan ini, kita otomatis punya method seperti: save(), findAll(), findById(), deleteById()
@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
}