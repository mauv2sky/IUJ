package com.iuj.backend.api.domain.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AcademyTypeDto {
    private String type;
    private List<AcademyDto> academys;

    public AcademyTypeDto(String type, List<AcademyDto> academys){
        this.type = type;
        this.academys = academys;
    }

}
