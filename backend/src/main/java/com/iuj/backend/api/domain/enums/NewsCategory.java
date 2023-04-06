package com.iuj.backend.api.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.EnumSet;

@Getter
@AllArgsConstructor
public enum NewsCategory {

    NURSERY("어린이집"),
    KINDERGARTEN("유치원"),
    ELEMENTARY_SCHOOL("초등학교"),
    MIDDLE_SCHOOL("중학교"),
    HIGH_SCHOOL("고등학교"),
    ACADEMY("학원");

    private final String name;

    public static NewsCategory getRandom() {
        //  학원은 데이터가 없어서 임시로 뺐음, 학원을 넣고싶다면 밑에 values().length)-1 에서 values().length)로 변경
        //  NewsUtil에서 29번째 줄 if문의 주석 제거
        return values()[(int)(Math.random()*(values().length-1))];
    }

    public static NewsCategory findByName(String name){
        return EnumSet.allOf(NewsCategory.class).stream()
                .filter(e->e.getName().equals(name))
                .findAny()
                .orElse(null);
    }
}
