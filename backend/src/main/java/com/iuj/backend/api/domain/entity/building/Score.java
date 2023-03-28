package com.iuj.backend.api.domain.entity.building;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.iuj.backend.api.domain.entity.Location;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@IdClass(ScoreId.class)
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Score{

    @Id
    private Long id;

    @Id
    @Column(length=10)
    private String type;

    @Column
    private int safe;

    @Column
    private int subway;

    @Column(name="bus_stop")
    private int busStop;

    @Column
    private int cinema;

    @Column
    private int library;

    @Column
    private int bookstore;

    @Column(name = "art_gallery")
    private int artGallery;

    @Column
    private int convi;

    @Column
    private int hospital;

    @Column(name = "public_office")
    private int publicOffice;

    @Column
    private int park;

    @Column
    private int supermarket;

    @Column
    private int nursery;

    @Column
    private int kindergarten;

    @Column(name = "elementary_school")
    private int elementaryScool;

    @Column(name = "middle_school")
    private int middleSchool;

    @Column(name = "high_school")
    private int highSchool;

}
