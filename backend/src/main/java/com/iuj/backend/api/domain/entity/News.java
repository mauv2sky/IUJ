package com.iuj.backend.api.domain.entity;

import com.iuj.backend.util.converter.StringToIntegerListConverter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;

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

    @Column(name = "similar_list", length = 45)
    @Convert(converter = StringToIntegerListConverter.class)
    private List<Integer> similarList;
}
