package com.iuj.backend.api.domain.entity.building;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor
public class OfficetelDeal {
    @Id
    private int id;
    @Column(length = 45)
    private String area;
    @Column(length = 8)
    private String contract_ym;
    @Column (length = 2)
    private String contract_day;
    @Column(length = 10, name="deal_type")
    private String dealType;
    @Column(nullable = true)
    private int guarantee;
    @Column(nullable = true)
    private int price;
    @Column
    private int floor;
    @Column(nullable = true)
    private int monthly;

    @Column(name="officetel_id")
    private Long officetelId;


}
