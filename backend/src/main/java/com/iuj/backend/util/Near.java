package com.iuj.backend.util;

import com.iuj.backend.api.domain.dto.response.BusStopDto;
import com.iuj.backend.api.domain.entity.infra.BusStop;
import com.iuj.backend.api.repository.infra.BusStopRepository;
import com.iuj.backend.api.repository.infra.SubwayRepository;

import java.util.ArrayList;
import java.util.List;


public class Near {

    public String[] calLatLng(String lat, String lng) {
        double latitude = Double.parseDouble(lat);
        double longitude = Double.parseDouble(lng);

        double radius = 2;
        String minLatitude = String.valueOf(latitude - (radius / 111.319));
        String maxLatitude = String.valueOf(latitude + (radius / 111.319));
        String minLongitude = String.valueOf(longitude - (radius / (111.319 * Math.cos(Math.toRadians(latitude)))));
        String maxLongitude = String.valueOf(longitude + (radius / (111.319 * Math.cos(Math.toRadians(latitude)))));

        String[] latlng = new String[4];
        latlng[0] = minLatitude;
        latlng[1] = maxLatitude;
        latlng[2] = minLongitude;
        latlng[3] = maxLongitude;

        return latlng;
    }
}
