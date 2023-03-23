package com.iuj.backend.api.domain.enums;

import com.iuj.backend.api.domain.converter.BaseEnumCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.EnumSet;

@Getter
@AllArgsConstructor
public enum DealType implements BaseEnumCode<String> {
    BUY("매매"),
    LONG_TERM_RENT("전세"),
    MONTHLY_RENT("월세");

    private final String name;

    @Override
    public String getValue() {
        return this.getName();
    }

    public static DealType findByName(String name){
        return EnumSet.allOf(DealType.class).stream()
                        .filter(e->e.getName().equals(name))
                        .findAny()
                        .orElse(null);
    }

}
