package com.iuj.backend.api.domain.dto.response;

import com.iuj.backend.api.domain.enums.DealType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AverageDeal {
    DealType deal_type;
    int guarantee;
    int price;
    int monthly;
}
