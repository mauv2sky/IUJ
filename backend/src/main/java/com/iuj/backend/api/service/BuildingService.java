package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.common.BoundDto;
import com.iuj.backend.api.domain.dto.request.PlaceMainRequest;
import com.iuj.backend.api.domain.dto.response.BuildingDto;
import com.iuj.backend.api.domain.entity.building.Apt;
import com.iuj.backend.api.domain.enums.BuildingType;
import com.iuj.backend.api.repository.building.AptRepository;
import com.iuj.backend.api.repository.building.JDBCBuildingRepository;
import com.iuj.backend.api.repository.building.OfficetelRepository;
import com.iuj.backend.api.repository.building.VillaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuildingService {
    private final AptRepository aptRepository;
    private final OfficetelRepository officetelRepository;
    private final VillaRepository villaRepository;

    private final JDBCBuildingRepository jdbcBuildingRepository;

    public List<BuildingDto> getBuildingList(PlaceMainRequest request){
        BoundDto bound = request.getBound();
        List<BuildingDto> buildingList = jdbcBuildingRepository.getBuildingList(bound.getSw(), bound.getNe(), request.getDeal_type(), request.getType(), request.getFilter());
        BuildingType buildingType = request.getType();

        for(BuildingDto building : buildingList){
            building.setType(buildingType);
        }

        return buildingList.stream()
                .filter(t -> t.getAverageDeal().getDeal_type() != null)
                .collect(Collectors.toList());
    }
}
