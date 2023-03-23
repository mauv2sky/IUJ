package com.iuj.backend.api.domain.dto.response;

import com.iuj.backend.api.domain.entity.building.AptDeal;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AptDealDto {
    private Long id;

    private String area;
    private String contract_ym;
    private String contract_day;
    private String deal_type;
    private Integer guarantee;
    private Integer price;
    private Integer floor;
    private Integer monthly;
    private Long apt_id;

    private AptDto author;

    public AptDealDto(AptDeal entity){
        this.id = entity.getId();
        this.area = entity.getArea();
        this.contract_ym = entity.getContract_ym();
        this.contract_day = entity.getContract_day();
        this.deal_type = entity.getDeal_type();
        this.guarantee = entity.getGuarantee();
        this.price = entity.getPrice();
        this.floor = entity.getFloor();
        this.monthly = entity.getMonthly();
        this.apt_id = entity.getAptId();

    }
}
