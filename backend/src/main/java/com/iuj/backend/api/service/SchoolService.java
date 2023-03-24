package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.SchoolDto;
import com.iuj.backend.api.domain.entity.infra.BusStop;
import com.iuj.backend.api.domain.entity.infra.School;
import com.iuj.backend.api.repository.infra.SchoolRepository;
import com.iuj.backend.util.Near;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SchoolService {
    private final SchoolRepository schoolRepository;

    public List<SchoolDto> findNearBySchool(String lat, String lng){
        Near near = new Near();
        String[] latlng = near.calLatLng(lat, lng);

        List<School> schools = schoolRepository.findAllSchoolBtwlngAndlat(latlng[0],latlng[1],latlng[2],latlng[3]);

        List<SchoolDto> SchoolDtos = new ArrayList<>();

        for (School school : schools) {
            SchoolDto schoolDto = new SchoolDto(
                    school.getId(),
                    school.getName(),
                    school.getType(),
                    school.getLat(),
                    school.getLng(),
                    school.getAddr()
            );
            SchoolDtos.add(schoolDto);
        }
        return SchoolDtos;
    }
}
