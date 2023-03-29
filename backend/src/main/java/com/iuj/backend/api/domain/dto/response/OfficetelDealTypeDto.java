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
    private List<OfficetelDealDto> officetelDeals;

    public OfficetelDealTypeDto(String type, List<OfficetelDealDto> officetelDeals){
        this.type=type;
        this.officetelDeals = officetelDeals;
    }

}
