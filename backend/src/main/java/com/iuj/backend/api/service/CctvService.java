package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.CctvDto;
import com.iuj.backend.api.domain.entity.infra.Cctv;
import com.iuj.backend.api.repository.infra.CctvRepository;
import com.iuj.backend.util.Near;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CctvService {
    private final CctvRepository cctvRepository;


    public List<CctvDto> findNearbyCctvs(String lat, String lng){

        Near near = new Near();
        String[] latlng = near.calLatLng(lat, lng);

        List<Cctv> cctvs = cctvRepository.findAllCctvBtwlngAndlat(latlng[0],latlng[1], latlng[2],latlng[3]);

        List<CctvDto> cctvDtos = new ArrayList<>();
        for (Cctv cctv : cctvs) {
            CctvDto cctvDto = new CctvDto(
                    cctv.getId(),
                    cctv.getLat(),
                    cctv.getLng(),
                    cctv.getCount(),
                    cctv.getType(),
                    cctv.getDir()
            );
            cctvDtos.add(cctvDto);
        }
        return cctvDtos;
    }
}
