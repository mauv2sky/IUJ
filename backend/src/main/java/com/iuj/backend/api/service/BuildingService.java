package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.common.BoundDto;
import com.iuj.backend.api.domain.dto.mapping.LocationMapping;
import com.iuj.backend.api.domain.dto.request.PlaceMainRequest;
import com.iuj.backend.api.domain.dto.response.BuildingDto;
import com.iuj.backend.api.domain.enums.BuildingType;
import com.iuj.backend.api.repository.building.AptRepository;
import com.iuj.backend.api.repository.building.JDBCBuildingRepository;
import com.iuj.backend.api.repository.building.OfficetelRepository;
import com.iuj.backend.api.repository.building.VillaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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
        BuildingType buildingType = request.getType();
        BoundDto bound = request.getBound();
        int level = request.getLevel();

        List<BuildingDto> buildingList = null;

        if(level > 9) {
            throw new IllegalArgumentException();
        } else if(level > 3){
            List<LocationMapping> locList = null;

            if(buildingType.equals(BuildingType.APT)) {
                locList = aptRepository.getByBound(bound.getSw()[0], bound.getSw()[1], bound.getNe()[0], bound.getNe()[1]);
            } else if(buildingType.equals(BuildingType.OFFICETEL)){
                locList = officetelRepository.getByBound(bound.getSw()[0], bound.getSw()[1], bound.getNe()[0], bound.getNe()[1]);
            } else {
                locList = villaRepository.getByBound(bound.getSw()[0], bound.getSw()[1], bound.getNe()[0], bound.getNe()[1]);
            }

            buildingList = locList.stream()
                    .map(e -> BuildingDto.builder()
                            .id(e.getId())
                            .name(e.getName())
                            .latlng(new Double[]{e.getLat(), e.getLng()})
                            .build())
                    .collect(Collectors.toList());
        } else {
            buildingList = jdbcBuildingRepository.getBuildingList(bound.getSw(), bound.getNe(), request.getDeal_type(), request.getType(), request.getFilter());
            buildingList = buildingList.stream()
                    .filter(t -> t.getAverageDeal().getDeal_type() != null)
                    .collect(Collectors.toList());
        }

        if(buildingList != null){
            for(BuildingDto building : buildingList){
                building.setType(buildingType);
            }
        }
        return buildingList;
    }
}
