package com.iuj.backend.api.domain.enums;

public enum DealType {
    BUY("매매"),
    LONG_TERM_RENT("전세"),
    MONTHLY_RENT("월세");

    private String name;

    DealType(String name) {
        this.name = name;
    }
}
