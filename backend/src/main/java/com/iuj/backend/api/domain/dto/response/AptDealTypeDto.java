package com.iuj.backend.api.domain.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@Getter
@Setter
@ToString
public class AptDealTypeDto {
    private String type;
    private List<AptDealDto> Deals;

    public AptDealTypeDto(String type, List<AptDealDto> aptDeals){
        this.type=type;
        this.Deals = aptDeals;
    }

    public int getMinPrice() {
        if("매매".equals(type)){
            return Deals.stream().mapToInt(AptDealDto::getPrice).min().orElse(0);
        }else{
            return Deals.stream().mapToInt(AptDealDto::getGuarantee).min().orElse(0);
        }
    }

    public int getMaxPrice() {
        if("매매".equals(type)){
            return Deals.stream().mapToInt(AptDealDto::getPrice).max().orElse(0);
        }else{
            return Deals.stream().mapToInt(AptDealDto::getGuarantee).max().orElse(0);
        }
    }
}
