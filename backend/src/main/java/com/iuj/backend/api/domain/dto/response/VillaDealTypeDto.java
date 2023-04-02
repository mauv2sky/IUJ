package com.iuj.backend.api.domain.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class VillaDealTypeDto {
    private String type;
    private List<VillaDealDto> Deals;

    public VillaDealTypeDto(String type, List<VillaDealDto> villaDeals){
        this.type=type;
        this.Deals = villaDeals;
    }

    public int getMaxPrice() {
        if("매매".equals(type)){
            return Deals.stream().mapToInt(VillaDealDto::getPrice).max().orElse(0);
        }else{
            return Deals.stream().mapToInt(VillaDealDto::getGuarantee).max().orElse(0);
        }
    }
    public int getMinPrice() {
        if("매매".equals(type)){
            return Deals.stream().mapToInt(VillaDealDto::getPrice).min().orElse(0);
        }else{
            return Deals.stream().mapToInt(VillaDealDto::getGuarantee).min().orElse(0);
        }
    }
}
