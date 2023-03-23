package com.iuj.backend.api.domain.entity.building;

import com.iuj.backend.api.domain.entity.Location;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Villa extends Location {
    @Id
    private Long id;

    @Column(length=50)
    private String sigungu;

    @Column(length=20)
    private String bungi;

    @Column(length=50)
    private String name;

    @Column(length=8)
    private String built_year;

    @Column(length=50)
    private String road_addr;
}
