package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.common.BoundDto;
import com.iuj.backend.api.domain.dto.mapping.LocationMapping;
import com.iuj.backend.api.domain.dto.request.PlaceMainRequest;
import com.iuj.backend.api.domain.dto.response.BuildingDto;
import com.iuj.backend.api.domain.entity.building.Score;
import com.iuj.backend.api.domain.enums.BuildingType;
import com.iuj.backend.api.repository.building.AptRepository;
import com.iuj.backend.api.repository.building.JDBCBuildingRepository;
import com.iuj.backend.api.repository.building.OfficetelRepository;
import com.iuj.backend.api.repository.building.VillaRepository;
import com.iuj.backend.api.repository.score.ScoreRepository;
import com.iuj.backend.util.ScoreUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuildingService {
    private final AptRepository aptRepository;
    private final OfficetelRepository officetelRepository;
    private final VillaRepository villaRepository;
    private final ScoreRepository scoreRepository;

    private final JDBCBuildingRepository jdbcBuildingRepository;

    public List<BuildingDto> getBuildingList(PlaceMainRequest request){
        BuildingType buildingType = request.getType();
        BoundDto bound = request.getBound();
        int level = request.getLevel();

        List<BuildingDto> buildingList;

        if(level > 9) {
            throw new IllegalArgumentException();
        } else if(level > 4){
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

        // 점수 추가
        if(!buildingList.isEmpty() && request.getLevel() <= 4){

            List<Long> idList = new ArrayList<>();
            for(BuildingDto building : buildingList){
                idList.add(building.getId());
            }

            // building list 아이디로 점수 가져오기
            List<Score> scoreList = scoreRepository.getScoreByTypeAndIdIsIn(buildingType.getName().toUpperCase(), idList);
            System.out.println(scoreList);


            // 가져온 점수랑 건물 매칭
            if (request.getRecomm() == null){
                for(BuildingDto building : buildingList){
                    Score score = scoreList.stream().filter(o -> Objects.equals(o.getId(), building.getId())).findFirst().orElse(new Score());
                    building.setTotalScore(ScoreUtil.getBasicScore(score));
                }
                // 점수 있을 때, 총점에 따라 정렬
                Collections.sort( buildingList, (o1, o2) -> (int) (o2.getTotalScore()*10 - o1.getTotalScore()*10));
            } else {
                for(BuildingDto building : buildingList){
                    Score score = scoreList.stream().filter(o -> Objects.equals(o.getId(), building.getId())).findFirst().orElse(new Score());
                    LinkedHashMap<String, Integer> scoreMap = ScoreUtil.getScoreMap(request.getRecomm(), score);
                    building.setScore(scoreMap);
                    building.setTotalScore(ScoreUtil.getTotalScoreByRecomm(scoreMap, score));
                }
                // 점수 있을 때, 총점에 따라 정렬
                Collections.sort( buildingList, (o1, o2) -> (int) (o2.getTotalScore()*10 - o1.getTotalScore()*10));
            }
        }

        buildingList.forEach(b -> b.setType(buildingType));
        return buildingList;
    }

}
