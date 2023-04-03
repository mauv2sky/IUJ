package com.iuj.backend.api.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.iuj.backend.api.domain.enums.BuildingType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import java.util.Map;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "주기능 - 건물 정보", description = "주기능 api에서 사용하는 건물 정보 DTO")
public class BuildingDto {
    @ApiModelProperty(value = "건물 ID")
    private Long id;

    private String name;
    private BuildingType type;
    private Double[] latlng;
    private String[] address;

    // 사진
    private String img;

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

}
