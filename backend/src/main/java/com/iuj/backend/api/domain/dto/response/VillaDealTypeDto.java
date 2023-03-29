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
    private List<VillaDealDto> villaDeals;

    public VillaDealTypeDto(String type, List<VillaDealDto> villaDeals){
        this.type=type;
        this.villaDeals = villaDeals;
    }

}
