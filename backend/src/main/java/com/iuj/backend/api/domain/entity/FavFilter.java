package com.iuj.backend.api.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class FavFilter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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