package com.iuj.backend.api.domain.dto.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "선호 필터 등록 모델")
public class RecommRequest {

    @ApiModelProperty(value = "선호 필터", required = true)
    private List recomm;

}