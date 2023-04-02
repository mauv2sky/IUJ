package com.iuj.backend.api.domain.dto.response;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShoppingDto {
    private int id;
    private String name;
    private String lat;
    private String lng;
    private String addr;
    private String type;

    public ShoppingDto(int id, String name, String lat, String lng, String addr, String type){
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.addr = addr;
        this.type = type;
    }
}
