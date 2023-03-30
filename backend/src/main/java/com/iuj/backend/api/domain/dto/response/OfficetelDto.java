package com.iuj.backend.api.domain.dto.response;

import com.iuj.backend.api.domain.entity.Location;
import com.iuj.backend.api.domain.entity.building.Apt;
import com.iuj.backend.api.domain.entity.building.Officetel;
import lombok.*;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OfficetelDto extends Location {
    private Long id;

    private String sigungu;

    private String bungi;

    private String name;

    private String built_year;

    private String road_addr;



    public OfficetelDto(Officetel entity) {
        super(entity);
        this.id = entity.getId();
        this.sigungu = entity.getSigungu();
        this.bungi = entity.getBungi();
        this.name = entity.getName();
        this.built_year = entity.getBuilt_year();
        this.road_addr = entity.getRoad_addr();
    }
}
