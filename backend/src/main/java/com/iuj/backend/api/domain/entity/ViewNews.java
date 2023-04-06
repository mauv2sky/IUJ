package com.iuj.backend.api.domain.entity;

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
public class ViewNews {
    @Id
    @Column
    private String email;

    @Column(name = "news_id")
    private int newsId;

}
