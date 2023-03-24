package com.iuj.backend.api.domain.dto.common;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor

@ApiModel(description = "좌하, 우상의 위경도 좌표 정보 모델")

public class BoundDto {
    @ApiModelProperty(value = "좌하 위경도 좌표", required = true)
    private String[] sw;

    @ApiModelProperty(value = "우상 위경도 좌표", required = true)
    private String[] ne;
}
