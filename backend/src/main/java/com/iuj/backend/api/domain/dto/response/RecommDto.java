// GetPlaceLikeRequest.java
// jwt은 헤더로 와서 적을 필요가 없음

package com.iuj.backend.api.domain.dto.response;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "선호 필터 조회 모델 2")
public class RecommDto {

    @ApiModelProperty(value = "선호 필터 id", required = true)
    private Long id;

    @ApiModelProperty(value = "[{main, sub}, {ms2},...]", required = true)
    private List<MainSub> list;



}
