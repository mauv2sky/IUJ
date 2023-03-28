// GetPlaceLikeRequest.java
// jwt은 헤더로 와서 적을 필요가 없음

package com.iuj.backend.api.domain.dto.response;


import io.swagger.annotations.ApiModel;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@ApiModel(description = "선호 필터 조회 모델")
public
class MainSub {
    private String main;
    private String sub;

    public MainSub(String main, String sub) {
        this.main = main;
        this.sub = sub;
    }

    public String getMain() {
        return main;
    }

    public String getSub() {
        return sub;
    }
}