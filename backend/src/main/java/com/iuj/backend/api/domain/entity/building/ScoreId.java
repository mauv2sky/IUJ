package com.iuj.backend.api.domain.entity.building;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class ScoreId implements Serializable {
    private Long id;
    private String type;
}
