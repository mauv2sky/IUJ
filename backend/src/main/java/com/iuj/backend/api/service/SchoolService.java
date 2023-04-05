package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.SchoolDto;
import com.iuj.backend.api.domain.dto.response.SchoolTypeDto;
import com.iuj.backend.api.domain.entity.infra.BusStop;
import com.iuj.backend.api.domain.entity.infra.School;
import com.iuj.backend.api.repository.infra.SchoolRepository;
import com.iuj.backend.util.Near;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SchoolService {
    private final SchoolRepository schoolRepository;



    public List<SchoolTypeDto> findNearBySchool(String lat, String lng) {
        Near near = new Near();
        String[] latlng = near.calLatLng(lat, lng);

        List<School> schools = schoolRepository.findAllSchoolBtwlngAndlat(latlng[0], latlng[1], latlng[2], latlng[3]);

        Map<String, List<SchoolDto>> schoolMap = new HashMap<>();

        for (School school : schools) {
            double distance = calculateDistance(Double.parseDouble(lat), Double.parseDouble(lng), Double.parseDouble(school.getLat()), Double.parseDouble(school.getLng()));
            SchoolDto schoolDto = new SchoolDto(
                    school.getId(),
                    school.getName(),
                    school.getType(),
                    school.getLat(),
                    school.getLng(),
                    school.getAddr(),
                    distance
            );
            String schoolType = school.getType();
            List<SchoolDto> schoolList = schoolMap.getOrDefault(schoolType, new ArrayList<>());
            schoolList.add(schoolDto);
            schoolMap.put(schoolType, schoolList);
        }

        List<SchoolTypeDto> schoolTypeDtos = new ArrayList<>();
        for (Map.Entry<String, List<SchoolDto>> entry : schoolMap.entrySet()) {
            String schoolType = entry.getKey();
            List<SchoolDto> schoolList = entry.getValue();
            SchoolTypeDto schoolTypeDto = new SchoolTypeDto(schoolType, schoolList);
            schoolTypeDtos.add(schoolTypeDto);
        }

        return schoolTypeDtos;
    }



    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double R = 6371; // Radius of the earth in km
        double dLat = deg2rad(lat2 - lat1);  // deg2rad below
        double dLon = deg2rad(lon2 - lon1);
        double a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double d = R * c; // Distance in km
        return Math.round(d * 100.0) / 100.0;
    }
    private double deg2rad(double deg) {
        return deg * (Math.PI / 180);
    }


}
