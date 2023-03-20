package com.iuj.backend.api.domain.dto.response;

import com.iuj.backend.api.domain.entity.building.Apt;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
@Setter
public class AptDto extends LocationDto{
    private Long id;

    private String sigungu;

    private String bungi;

    private String name;

    private String built_year;

    private String road_addr;


    public AptDto(Apt entity) {
        super(entity);
        this.id = entity.getId();
        this.sigungu = entity.getSigungu();
        this.bungi = entity.getBungi();
        this.name = entity.getName();
        this.built_year = entity.getBuilt_year();
        this.road_addr = entity.getRoad_addr();
    }
}
