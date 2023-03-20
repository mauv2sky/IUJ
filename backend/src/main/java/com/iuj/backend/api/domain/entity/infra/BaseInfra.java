package com.iuj.backend.api.domain.entity.infra;

import com.iuj.backend.api.domain.entity.Location;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@Getter
@Setter
@MappedSuperclass
public abstract class BaseInfra extends Location {

    @Id
    @Column(name = "id")
    private int id;
}
