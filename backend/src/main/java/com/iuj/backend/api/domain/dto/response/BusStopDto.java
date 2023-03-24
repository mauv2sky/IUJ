package com.iuj.backend.api.domain.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusStopDto {
    private int id;
    private String name;
    private String lat;
    private String lng;

    public BusStopDto(int id, String name, String lat, String lng){
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }

}