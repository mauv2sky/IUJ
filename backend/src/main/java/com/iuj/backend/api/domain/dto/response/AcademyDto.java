package com.iuj.backend.api.domain.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AcademyDto {
    private int id;
    private String name;
    private String lat;
    private String lng;
    private String type;
    private String addr;
    private double distance;

    public AcademyDto(int id, String name, String lat, String lng, String type, String addr, double distance){
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.type = type;
        this.addr = addr;
        this.distance = distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getDistance() {
        return distance;
    }
}
