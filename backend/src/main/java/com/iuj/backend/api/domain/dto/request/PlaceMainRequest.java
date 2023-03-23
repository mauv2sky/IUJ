package com.iuj.backend.api.domain.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.iuj.backend.api.domain.dto.common.BoundDto;
import com.iuj.backend.api.domain.enums.BuildingType;
import com.iuj.backend.api.domain.enums.DealType;
import com.iuj.backend.api.domain.enums.Recomm;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Convert;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
//@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class PlaceMainRequest {
    @ApiModelProperty(value = "건물 타입", required = true)
//    @Convert(converter = BuildingTypeConverter.class)
    private BuildingType type;

    @ApiModelProperty(value = "거래 종류", example = "매매", required = true)
//    @Convert(converter = TestConverter.class)
    private DealType deal_type;

    @ApiModelProperty(value = "좌하, 우상의 위경도 좌표 정보, sw: [lat, lng], ne:[..]", required = true)
    private BoundDto bound;

    @ApiModelProperty(value = "지도 레벨 (1~14)", required = true)
    private int level;

    @ApiModelProperty(value = "기본 필터 (가격, 넗이, 층수)", required = true)
    private BasicFilter filter;

    @ApiModelProperty(value = "선호 필터 (높은 순위부터 낮은 순위 순서로)", required = true)
    private List<Recomm> recomm;
}
