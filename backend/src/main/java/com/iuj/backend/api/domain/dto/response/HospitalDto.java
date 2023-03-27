package com.iuj.backend.api.domain.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HospitalDto {
    private int id;
    private String name;
    private String lat;
    private String lng;

    public HospitalDto(int id, String name, String lat, String lng){
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }

}
