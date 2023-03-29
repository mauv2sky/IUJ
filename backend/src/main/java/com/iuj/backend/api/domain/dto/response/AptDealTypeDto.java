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
    private List<AptDealDto> aptDeals;

    public AptDealTypeDto(String type, List<AptDealDto> aptDeals){
        this.type=type;
        this.aptDeals = aptDeals;
    }

    public int getMinPrice() {
        if("매매".equals(type)){
            return aptDeals.stream().mapToInt(AptDealDto::getPrice).min().orElse(0);
        }else{
            return aptDeals.stream().mapToInt(AptDealDto::getGuarantee).min().orElse(0);
        }
    }

    public int getMaxPrice() {
        if("매매".equals(type)){
            return aptDeals.stream().mapToInt(AptDealDto::getPrice).max().orElse(0);
        }else{
            return aptDeals.stream().mapToInt(AptDealDto::getGuarantee).max().orElse(0);
        }
    }
}
