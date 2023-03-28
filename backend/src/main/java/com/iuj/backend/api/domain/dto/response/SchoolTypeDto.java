package com.iuj.backend.api.domain.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SchoolTypeDto {
    private String type;
    private List<SchoolDto> schools;

    public SchoolTypeDto(String type, List<SchoolDto> schools){
        this.schools = schools;
        this.type = type;
    }



}
