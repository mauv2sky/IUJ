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
    private double distance;

    public SchoolDto(int id, String name, String type, String lat, String lng, String addr, double distance){
        this.id = id;
        this.name = name;
        this.type = type;
        this.lat = lat;
        this.lng = lng;
        this.addr = addr;
        this.distance = distance;
    }
    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getDistance() {
        return distance;
    }

    @Override
    public String toString() {
        return "SchoolDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", lat='" + lat + '\'' +
                ", lng='" + lng + '\'' +
                ", addr='" + addr + '\'' +
                ", distance=" + distance + // 거리 추가
                '}';
    }
}
