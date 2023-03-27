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
@ApiModel(description = "선호 필터 삭제 모델")
public class DelRecommRequest {

    @ApiModelProperty(value = "선호 필터 id", required = true)
    private Long id;

}
