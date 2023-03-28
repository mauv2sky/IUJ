package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.common.BoundDto;
import com.iuj.backend.api.domain.dto.mapping.LocationMapping;
import com.iuj.backend.api.domain.dto.request.BasicFilter;
import com.iuj.backend.api.domain.dto.request.PlaceMainRequest;
import com.iuj.backend.api.domain.dto.response.BuildingDto;
import com.iuj.backend.api.domain.enums.BuildingType;
import com.iuj.backend.api.domain.enums.Recomm;
import com.iuj.backend.api.repository.building.AptRepository;
import com.iuj.backend.api.repository.building.JDBCBuildingRepository;
import com.iuj.backend.api.repository.building.OfficetelRepository;
import com.iuj.backend.api.repository.building.VillaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.Basic;
import java.util.HashMap;
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

        // 평수 -> 제곱미터 변환
//        BasicFilter filter = request.getFilter();
//        int[] extent = filter.getExtent();
//        filter.setExtent(new int[]{(int)Math.ceil(extent[0] * 3.3058), (int) ((extent[1]+1) * 3.3058)});

        List<BuildingDto> buildingList;

        if(level > 9) {
            throw new IllegalArgumentException();
        } else if(level > 3){
            List<LocationMapping> locList;

            if(buildingType.equals(BuildingType.APT)) {
                locList = aptRepository.getByBound(Double.toString(bound.getSw()[0]), Double.toString(bound.getSw()[1]), Double.toString(bound.getNe()[0]), Double.toString(bound.getNe()[1]));
            } else if(buildingType.equals(BuildingType.OFFICETEL)){
                locList = officetelRepository.getByBound(Double.toString(bound.getSw()[0]), Double.toString(bound.getSw()[1]), Double.toString(bound.getNe()[0]), Double.toString(bound.getNe()[1]));
            } else {
                locList = villaRepository.getByBound(Double.toString(bound.getSw()[0]), Double.toString(bound.getSw()[1]), Double.toString(bound.getNe()[0]), Double.toString(bound.getNe()[1]));
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

        System.out.println(buildingList);

        if(buildingList != null){
            for(BuildingDto building : buildingList){
                building.setType(buildingType);
                if(request.getLevel() <= 3 && request.getRecomm() != null){
                    building.setScore(getScoreMap(request.getRecomm()));
                }
                double random = Math.random();
                building.setTotalScore( Math.round(random * 10000.0) / 100.0);
            }
        }
        return buildingList;
    }

    private HashMap<String, Integer> getScoreMap(List<Recomm> recomm){
        HashMap<String, Integer> score = new HashMap<>();
        for(Recomm r : recomm){
            score.put(r.getSub(), ((int) (Math.random() * 10))*10);
        }
        return score;
    }
}
