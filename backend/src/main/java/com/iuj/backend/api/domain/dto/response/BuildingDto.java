package com.iuj.backend.api.domain.dto.response;

import com.iuj.backend.api.domain.enums.BuildingType;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
public class BuildingDto {
    private Long id;
    private String name;
    private BuildingType type;
    private Double[] latlng;
    private String[] address;

    // 거래 관련
    private List<DealDto> deal;

    // 점수 관련
    private Double total_score;
    private Map<String, Integer> score;
    private AverageDeal average_deal;

    private Double[] range_extent;
    private int[] range_floor;

    // 지도에 표시
    private MapDto map;
    private FacilityDto facility;

}
