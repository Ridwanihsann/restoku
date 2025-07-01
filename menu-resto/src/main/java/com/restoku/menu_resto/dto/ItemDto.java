package com.restoku.menu_resto.dto;
import lombok.Data;
@Data
public class ItemDto {
    private Long id;
    private String namaMenu;
    private Double harga;
    private Integer kuantitas;
}