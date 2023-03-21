package com.iuj.backend.api.domain.enums;

public enum BuildingType {
    APT("apt"),
    OFFICETEL("officetel"),
    VILLA("villa");

    private final String name;

    BuildingType(String name) {
        this.name = name;
    }
    
}
