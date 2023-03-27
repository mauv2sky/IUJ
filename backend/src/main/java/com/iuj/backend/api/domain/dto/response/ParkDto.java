package com.iuj.backend.api.domain.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParkDto {
    private int id;
    private String name;
    private String lat;
    private String lng;
    private String type;
    public ParkDto(int id, String name, String lat, String lng, String type){
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.type = type;
    }

}
