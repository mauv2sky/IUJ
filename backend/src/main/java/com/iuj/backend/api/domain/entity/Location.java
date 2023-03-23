package com.iuj.backend.api.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@Getter
@Setter
@MappedSuperclass
public abstract class Location {
    @Column(length=45)
    private String lat;

    @Column(length=45)
    private String lng;
}