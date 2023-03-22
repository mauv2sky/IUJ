// PlaceLikeRequest.java
// jwt은 헤더로 와서 적을 필요가 없음

package com.iuj.backend.api.domain.dto.request;


@Setter
@Getter
@ToString
@NoArgsConstructor

@ApiModel(description = "관심 매물 조회 모델")

public class PlaceLikeRequest {

    @ApiModelProperty(value = "건물 타입( apt | villa | officetel )", required = true)
    private char type;

    @ApiModelProperty(value = "건물 id", required = true)
    private int building_id;

}