// GetPlaceLikeRequest.java
// jwt은 헤더로 와서 적을 필요가 없음

package com.iuj.backend.api.domain.dto.request;


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
public class RecommRequest {

    @ApiModelProperty(value = "성호 필터", required = true)
    private List recomm;


}
