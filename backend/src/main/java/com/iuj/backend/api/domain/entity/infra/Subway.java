package com.iuj.backend.api.domain.entity.infra;

import lombok.*;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;

@AttributeOverride(name = "id", column = @Column(name = "idsubway"))
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Subway extends BaseInfra{

    @Column(length=45)
    private String name;

    @Column(length=45)
    private String line;

}
