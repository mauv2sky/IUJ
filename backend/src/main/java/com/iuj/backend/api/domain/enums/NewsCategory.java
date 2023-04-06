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
        return values()[(int)(Math.random()*values().length)];
    }

    public static NewsCategory findByName(String name){
        return EnumSet.allOf(NewsCategory.class).stream()
                .filter(e->e.getName().equals(name))
                .findAny()
                .orElse(null);
    }
}
