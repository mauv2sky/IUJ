package com.iuj.backend.api.domain.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class FavFilter {
    @Id
    private Long id;

    @Column(length = 30)
    private String email;

    @Column(length = 10, nullable = true)
    private String first;

    @Column(length = 10, nullable = true)
    private String second;

    @Column(length = 10, nullable = true)
    private String third;

    @Column(length = 10, nullable = true)
    private String fourth;

    @Column(length = 10, nullable = true)
    private String fifth;

}
