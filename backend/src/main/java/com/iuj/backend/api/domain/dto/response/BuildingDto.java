package com.iuj.backend.api.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.iuj.backend.api.domain.enums.BuildingType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.*;

import java.util.List;
import java.util.Map;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "ㅇㅇ", description = "ㅇㅇ")
public class BuildingDto {
    @ApiModelProperty(value = "건물 ID")
    private Long id;

    private String name;
    private BuildingType type;
    private Double[] latlng;
    private String[] address;

    // 거래 관련
    private List<AptDealDto> deal;

    // 점수 관련
    @JsonProperty("total_score")
    private Double totalScore;

    private Map<String, Integer> score;

    @JsonProperty("average_deal")
    private AverageDeal averageDeal;

    @JsonProperty("range_extent")
    private Double[] rangeExtent;

    @JsonProperty("range_floor")
    private int[] rangeFloor;

    // 지도에 표시
    private MapDto map;
    private FacilityDto facility;

}
