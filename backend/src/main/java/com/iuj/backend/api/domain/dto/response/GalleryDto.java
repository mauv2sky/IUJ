package com.iuj.backend.api.domain.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GalleryDto {
    private int id;
    private String name;
    private String lat;
    private String lng;
    private String addr;
    public GalleryDto(int id, String name, String lat, String lng, String addr){
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.addr = addr;
    }

}
