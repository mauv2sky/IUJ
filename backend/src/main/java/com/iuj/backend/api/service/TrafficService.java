package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.BusStopDto;
import com.iuj.backend.api.domain.dto.response.SubwayDto;
import com.iuj.backend.api.domain.entity.infra.BusStop;
import com.iuj.backend.api.domain.entity.infra.Subway;
import com.iuj.backend.api.repository.infra.BusStopRepository;
import com.iuj.backend.api.repository.infra.SubwayRepository;
import com.iuj.backend.util.Near;
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

        Near near = new Near();
        String[] latlng = near.calLatLng(lat, lng);

        List<BusStop> busStops = busStopRepository.findAllBusBtwlngAndlat(latlng[0],latlng[1], latlng[2],latlng[3]);

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

    public List<SubwayDto> findNearbySubways(String lat, String lng){

        Near near = new Near();
        String[] latlng = near.calLatLng(lat, lng);

        List<Subway> subways = subwayRepository.findAllSubBtwlngAndlat(latlng[0],latlng[1], latlng[2],latlng[3]);

        List<SubwayDto> subwayDtos = new ArrayList<>();
        for (Subway subway : subways) {
            SubwayDto subwayDto = new SubwayDto(
                    subway.getId(),
                    subway.getName(),
                    subway.getLat(),
                    subway.getLng()
            );
            subwayDtos.add(subwayDto);
        }
        return subwayDtos;
    }
}
