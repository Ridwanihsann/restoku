package com.restoku.menu_resto.dto;
import java.util.List;

import lombok.Data;
@Data
public class PesananRequestDto {
    private String nomorMeja;
    private List<ItemDto> items;

    private String namaPemesan;
    private String noHandphone;
}