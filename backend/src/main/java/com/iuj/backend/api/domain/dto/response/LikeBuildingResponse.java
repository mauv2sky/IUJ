// GetPlaceLikeRequest.java
// jwt은 헤더로 와서 적을 필요가 없음

package com.iuj.backend.api.domain.dto.response;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@ApiModel(description = "관심 매물 조회 모델")
public class LikeBuildingResponse {

    @ApiModelProperty(value = "건물 이름", required = true)
    private String name;

    @ApiModelProperty(value = "건물 주소[도로명, 지번]", required = true)
    private List<String> address;

    @ApiModelProperty(value = "건물 가격", required = true)
    private List<Integer> deal;

    @ApiModelProperty(value = "건물 타입", required = true)
    private String type;

    @ApiModelProperty(value = "건물 id(타입별)", required = true)
    private Long id;

}
