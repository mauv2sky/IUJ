package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.AcademyDto;
import com.iuj.backend.api.domain.dto.response.AcademyTypeDto;
import com.iuj.backend.api.domain.dto.response.SchoolDto;
import com.iuj.backend.api.domain.dto.response.SchoolTypeDto;
import com.iuj.backend.api.domain.entity.infra.Academy;
import com.iuj.backend.api.domain.entity.infra.School;
import com.iuj.backend.api.repository.infra.AcademyRepository;
import com.iuj.backend.util.Near;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AcademyService {
    private final AcademyRepository academyRepository;

    public List<AcademyTypeDto> findNearByAcademy(String lat, String lng){
        Near near = new Near();
        String[] latlng = near.calLatLng(lat, lng);

        List<Academy> academys = academyRepository.findAllAcademyBtwlatAndlat(latlng[0],latlng[1],latlng[2],latlng[3]);

        Map<String, List<AcademyDto>> academyMap = new HashMap<>();

        for (Academy academy : academys) {
            AcademyDto academyDto = new AcademyDto(
                    academy.getId(),
                    academy.getName(),
                    academy.getType(),
                    academy.getLat(),
                    academy.getLng(),
                    academy.getAddr()
            );
            String academyType = academy.getType();
            List<AcademyDto> academyList = academyMap.getOrDefault(academyType, new ArrayList<>());
            academyList.add(academyDto);
            academyMap.put(academyType, academyList);

        }

        List<AcademyTypeDto> academyTypeDtos = new ArrayList<>();
        for(Map.Entry<String, List<AcademyDto>> entry : academyMap.entrySet()){
            String academyType = entry.getKey();
            List<AcademyDto> academyList = entry.getValue();
            AcademyTypeDto academyTypeDto = new AcademyTypeDto(academyType, academyList);
            academyTypeDtos.add(academyTypeDto);
        }

        return academyTypeDtos;
    }
}
