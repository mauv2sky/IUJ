package com.iuj.backend.api.domain.entity.building;

import com.iuj.backend.api.domain.entity.Location;
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
public class AptDeal {
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

    @Column(name="apt_id")
    private Long aptId;


}
