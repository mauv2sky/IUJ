package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.BusStopDto;
import com.iuj.backend.api.domain.entity.infra.BusStop;
import com.iuj.backend.api.domain.entity.infra.Subway;
import com.iuj.backend.api.repository.infra.BusStopRepository;
import com.iuj.backend.api.repository.infra.SubwayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
public class TrafficService {
    private final BusStopRepository busStopRepository;
    private final SubwayRepository subwayRepository;
    public List<BusStop> getAllBusStops(){
        return busStopRepository.findAll();
    }

    public List<BusStopDto> findNearbyBusStops(String lat, String lng){
        double latitude = Double.parseDouble(lat);
        double longitude = Double.parseDouble(lng);

        double radius = 5;
        double minLatitude = latitude - (radius/111.319);
        double maxLatitude = latitude + (radius/111.319);
        double minLongitude = longitude - (radius/(111.319 * Math.cos(Math.toRadians(latitude))));
        double maxLongitude = longitude + (radius/(111.319 * Math.cos(Math.toRadians(latitude))));

        String minLat = String.valueOf(minLatitude);
        String maxLat = String.valueOf(maxLatitude);
        String minLng = String.valueOf(minLongitude);
        String maxLng = String.valueOf(maxLongitude);

        List<BusStop> busStops = busStopRepository.findAllBusBtwlngAndlat(minLat,maxLat, minLng,maxLng);

        List<BusStopDto> busStopDtos = new ArrayList<>();
        for (BusStop busStop : busStops) {
            BusStopDto busStopDto = new BusStopDto(
                busStop.getId(),
                busStop.getName(),
                busStop.getLat(),
                busStop.getLng()
            );
            busStopDtos.add(busStopDto);
        }
        return busStopDtos;
    }

    public List<Subway> getAllSubStops(){
        return subwayRepository.findAll();
    }
}
