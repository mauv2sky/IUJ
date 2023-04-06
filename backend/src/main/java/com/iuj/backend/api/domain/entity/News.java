package com.iuj.backend.api.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString
public class News {
    @Id
    @Column
    private int id;

    @Column(length = 45)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(length = 45)
    private String school;

    @Column(length = 45)
    private String local;

    @Column(length = 45, name="pub_date")
    private String pubDate;

    @Column(length = 45)
    private String link;
}
