package com.iuj.backend.api.domain.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor

@ApiModel(description = "기본 필터 모델")

public class BasicFilter {
//    static final Integer MIN_PRICE = 0;
//    static final Integer MAX_PRICE = Integer.MAX_VALUE;

    @ApiModelProperty(value = "가격 필터 - 매매")
    private int[] price;

    @ApiModelProperty(value = "가격 필터 - 보증금(전세, 월세)")
    private int[] guarantee;

    @ApiModelProperty(value = "가격 필터 - 월세")
    private int[] monthly;
    
    @ApiModelProperty(value = "평수 필터")
    private int[] extent;

    @ApiModelProperty(value = "층수 필터")
    private int[] floor;

}
