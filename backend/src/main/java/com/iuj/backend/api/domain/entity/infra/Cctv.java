package com.iuj.backend.api.domain.entity.infra;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Cctv extends BaseInfra{
    @Column
    private int count;

    @Column(length=45)
    private String dir;

    @Column(length=45)
    private String type;
}
