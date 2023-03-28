package com.iuj.backend.api.domain.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class VillaDealDto {
    private int id;
    private String area;
    private String contract_ym;
    private String contract_day;
    private String dealType;
    private int guarantee;
    private int price;
    private int floor;
    private int monthly;
    private Long villaId;

    private AptDto author;

    public VillaDealDto(int id, String area, String contract_ym, String contract_day, String dealType, int guarantee, int price, int floor, int monthly, Long villaId){
        this.id = id;
        this.area = area;
        this.contract_ym = contract_ym;
        this.contract_day = contract_day;
        this.dealType = dealType;
        this.guarantee = guarantee;
        this.floor = floor;
        this.price = price;
        this.monthly = monthly;
        this.villaId = villaId;

    }
}
