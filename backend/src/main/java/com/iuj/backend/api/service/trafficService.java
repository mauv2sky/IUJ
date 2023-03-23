package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.entity.infra.BusStop;
import com.iuj.backend.api.domain.entity.infra.Subway;
import com.iuj.backend.api.repository.infra.BusStopRepository;
import com.iuj.backend.api.repository.infra.SubwayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class trafficService {
    private final BusStopRepository busStopRepository;
    private final SubwayRepository subwayRepository;
    public List<BusStop> getAllBusStops(){
        return busStopRepository.findAll();
    }

    public List<BusStop> findNearbyBusStops(double lat, double lng){
        double radius = 5;
        double minLatitude = lat - (radius/111.319);
        double maxLatitude = lat + (radius/111.319);
        double minLongitude = lng - (radius/(111.319 * Math.cos(Math.toRadians(lat))));
        double maxLongitude = lng + (radius/(111.319 * Math.cos(Math.toRadians(lat))));

        return  busStopRepository.findAllBusBtwlngAndlat(minLatitude,maxLatitude, minLongitude,maxLongitude);
    }

    public List<Subway> getAllSubStops(){
        return subwayRepository.findAll();
    }
}
