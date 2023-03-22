package com.iuj.backend.api.domain.dto.response;

import com.iuj.backend.api.domain.entity.building.Apt;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class LocationDto {
    private String lat;
    private String lng;

    public LocationDto(String lat, String lng) {
        this.lat = lat;
        this.lng = lng;
    }

    public LocationDto(Apt entity) {
        this.lat = entity.getLat();
        this.lng = entity.getLng();
    }
}
