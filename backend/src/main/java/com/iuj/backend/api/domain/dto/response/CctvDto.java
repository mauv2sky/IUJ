package com.iuj.backend.api.domain.dto.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CctvDto {
    private int id;
    private String lat;
    private String lng;
    private int count;
    private String dir;
    private String type;

    public CctvDto(int id, String lat, String lng, int count, String dir, String type){
        this.id = id;
        this.lat=lat;
        this.lng = lng;
        this.count=count;
        this.dir=dir;
        this.type=type;
    }

}
