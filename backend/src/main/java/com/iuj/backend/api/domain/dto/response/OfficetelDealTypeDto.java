package com.iuj.backend.api.domain.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class OfficetelDealTypeDto {
    private String type;
    private List<OfficetelDealDto> Deals;

    public OfficetelDealTypeDto(String type, List<OfficetelDealDto> officetelDeals){
        this.type=type;
        this.Deals = officetelDeals;
    }

    public int getMinPrice() {
        if("매매".equals(type)){
            return Deals.stream().mapToInt(OfficetelDealDto::getPrice).min().orElse(0);
        }else{
            return Deals.stream().mapToInt(OfficetelDealDto::getGuarantee).min().orElse(0);
        }
    }
    public int getMaxPrice() {
        if("매매".equals(type)){
            return Deals.stream().mapToInt(OfficetelDealDto::getPrice).max().orElse(0);
        }else{
            return Deals.stream().mapToInt(OfficetelDealDto::getGuarantee).max().orElse(0);
        }
    }
}
