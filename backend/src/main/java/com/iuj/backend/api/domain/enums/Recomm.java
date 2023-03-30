package com.iuj.backend.api.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.EnumSet;

@Getter
@AllArgsConstructor
public enum Recomm {

    // 학군
    NURSERY("학군","어린이집"),
    KINDERGARTEN("학군","유치원"),
    ELEMENTARY_SCHOOL("학군","초등학교"),
    MIDDLE_SCHOOL("학군","중학교"),
    HIGH_SCHOOL("학군","고등학교"),
    SPECIAL_SCHOOL("학군","특수학교"),
    EDU_ACADEMY("학군","입시학원"),
    ENTERTAINMENT_ACADEMY("학군","예체능학원"),

    // 교통
    SUBWAY("교통","지하철"),
    BUS_STOP("교통","버스"),

    // 편의
    CONVENIENCE_STORE("편의","편의점"),
    SHOPPING("편의","마트"),
    HOSPITAL("편의","병원"),
    PUBLIC_OFFICE("편의", "관공서"),

    // 치안
    SAFETY("치안","치안"),

    // 문화
    PARK("문화","공원"),
    CINEMA("문화","영화관"),
    BOOKSTORE("문화","서점"),
    LIBRARY("문화","도서관"),
    GALLERY("문화","미술관");

    private final String main;
    private final String sub;

    public static Recomm findBySub(String sub){
        return EnumSet.allOf(Recomm.class).stream()
                .filter(e->e.getSub().equals(sub))
                .findAny()
                .orElse(null);
    }

}