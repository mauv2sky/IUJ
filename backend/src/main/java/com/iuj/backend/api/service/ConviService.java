package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.ConviDto;
import com.iuj.backend.api.domain.dto.response.HospitalDto;
import com.iuj.backend.api.domain.entity.infra.Convi;
import com.iuj.backend.api.domain.entity.infra.Hospital;
import com.iuj.backend.api.repository.infra.ConviRepository;
import com.iuj.backend.api.repository.infra.HospitalRepository;
import com.iuj.backend.util.Near;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConviService {
    private final ConviRepository conviRepository;
    private final HospitalRepository hospitalRepository;
//    편의점
    public List<ConviDto> findNearbyConvi(String lat, String lng){
        Near near = new Near();
        String[] latlng = near.calLatLng(lat, lng);

        List<Convi> convis = conviRepository.findAllConviBtwlngAndlat(latlng[0], latlng[1], latlng[2], latlng[3]);

        List<ConviDto> conviDtos = new ArrayList<>();
        for(Convi convi : convis){
            ConviDto conviDto = new ConviDto(
                    convi.getId(),
                    convi.getName(),
                    convi.getLat(),
                    convi.getLng(),
                    convi.getAddr()
            );
            conviDtos.add(conviDto);
        }
        return conviDtos;
    }

//    병원
public List<HospitalDto> findNearbyHospital(String lat, String lng){
    Near near = new Near();
    String[] latlng = near.calLatLng(lat, lng);

    List<Hospital> hospitals = hospitalRepository.findAllHospitalBtwlngAndlat(latlng[0], latlng[1], latlng[2], latlng[3]);

    List<HospitalDto> hospitalDtos = new ArrayList<>();
    for(Hospital hospital : hospitals){
        HospitalDto hospitalDto = new HospitalDto(
                hospital.getId(),
                hospital.getName(),
                hospital.getLat(),
                hospital.getLng()

        );
        hospitalDtos.add(hospitalDto);
    }
    return hospitalDtos;
}
}
