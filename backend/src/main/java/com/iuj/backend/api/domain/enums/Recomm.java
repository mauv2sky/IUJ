package com.iuj.backend.api.domain.enums;

public enum Recomm {

    // 학군
    NURSERY("어린이집"),
    KINDERGARTEN("유치원"),
    ELEMENTARY_SCHOOL("초등학교"),
    MIDDLE_SCHOOL("중학교"),
    HIGH_SCHOOL("고등학교"),
    SPECIAL_SCHOOL("특수학교"),
    EDU_ACADEMY("입시학원"),
    ENTERTAINMENT_ACADEMY("예체능학원"),

    // 교통
    SUBWAY("지하철"),
    BUS_STOP("버스정류장"),

    // 편의
    CONVENIENCE_STORE("편의점"),
    SHOPPING("마트"),
    HOSPITAL("병원"),

    // 치안
    SAFETY("치안"),

    // 문화
    PARK("공원"),
    CINEMA("영화관"),
    BOOKSTORE("서점"),
    GALLERY("미술관");

    private String name;

    Recomm(String name) {
        this.name = name;
    }
}
