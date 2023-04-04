package com.iuj.backend.api.domain.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.iuj.backend.api.domain.entity.building.BuildingId;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@Getter
@Setter
@ToString
@IdClass(BuildingId.class)
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BuildingPhoto {
    @Id
    private Long id;

    @Id
    @Column(length=10)
    private String type;

    @Column
    private String link;
}

