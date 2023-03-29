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
        return aptDeals.stream().mapToInt(AptDealDto::getPrice).min().orElse(0);
    }

    public int getMaxPrice() {
        return aptDeals.stream().mapToInt(AptDealDto::getPrice).max().orElse(0);
    }
}
