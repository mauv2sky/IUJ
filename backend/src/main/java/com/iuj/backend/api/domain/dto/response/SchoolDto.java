package com.iuj.backend.api.domain.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SchoolDto {
    private int id;
    private String name;
    private String type;
    private String lat;
    private String lng;
    private String addr;

    public SchoolDto(int id, String name, String type, String lat, String lng, String addr){
        this.id = id;
        this.name = name;
        this.type = type;
        this.lat = lat;
        this.lng = lng;
        this.addr = addr;


    }
}
