package com.iuj.backend.api.domain.entity;

import com.iuj.backend.api.domain.enums.Sido;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SearchRegion {
    @Id
    @Column
    private String email;

    @Column
    private String sido;

}
