package com.iuj.backend.api.domain.dto.request;

import com.iuj.backend.api.domain.dto.common.BoundDto;
import com.iuj.backend.api.domain.enums.BuildingType;
import com.iuj.backend.api.domain.enums.DealType;
import com.iuj.backend.api.domain.enums.Recomm;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Data;

import java.util.List;

@Data
public class PlaceMainRequest {
    @ApiParam(value = "건물 타입", required = true)
    private BuildingType type;

    @ApiParam(value = "거래 종류", example = "MONTHLY_RENT", required = true)
    private DealType deal_type;

    @ApiParam(value = "좌하, 우상의 위경도 좌표 정보, sw: [lat, lng], ne:[..]", required = true)
    private BoundDto bound;

    @ApiParam(value = "지도 레벨 (1~14)", required = true)
    private int level;

    @ApiParam(value = "기본 필터 (가격, 넗이, 층수)", required = true)
    private BasicFilter filter;

    @ApiParam(value = "선호 필터 (높은 순위부터 낮은 순위 순서로)", required = true)
    private List<Recomm> recomm;
}
