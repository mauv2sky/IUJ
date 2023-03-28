package com.iuj.backend.api.domain.entity.building;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class VillaDeal {
    @Id
    private Long id;
    @Column(length = 45)
    private String area;
    @Column(length = 8)
    private String contract_ym;
    @Column (length = 2)
    private String contract_day;
    @Column(length = 10)
    private String deal_type;
    @Column
    private Integer guarantee;
    @Column
    private Integer price;
    @Column
    private Integer floor;
    @Column
    private Integer monthly;

    @Column(name="villa_id")
    private Long villaId;
}
