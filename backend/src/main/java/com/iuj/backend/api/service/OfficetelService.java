package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.*;
import com.iuj.backend.api.domain.entity.building.AptDeal;
import com.iuj.backend.api.domain.entity.building.Officetel;
import com.iuj.backend.api.domain.entity.building.OfficetelDeal;
import com.iuj.backend.api.repository.building.OfficetelDealRepository;
import com.iuj.backend.api.repository.building.OfficetelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OfficetelService {
    private final OfficetelRepository officetelRepository;
    private final OfficetelDealRepository officetelDealRepository;

    // officetel ID로 해당 건물의 정보를 반환
    public OfficetelDto getOfficetelById(Long id){
        Officetel officetel = officetelRepository.findById(id).get();
        if(officetel == null){
            return null;
        }
        OfficetelDto officetelDto = new OfficetelDto(officetel);
        return officetelDto;
    }

//     건물 아이디로 거래 정보 반환
    public List<OfficetelDealTypeDto> getDealByOfficetelId(Long id){
        Map<String, List<OfficetelDealDto>> DealMap = new HashMap<>();
        List<OfficetelDeal> deals = officetelDealRepository.findByOfficetelId(id);

        for (OfficetelDeal officetelDeal : deals) {
            OfficetelDealDto officetelDealDto = new OfficetelDealDto(
                    officetelDeal.getId(),
                    officetelDeal.getArea(),
                    officetelDeal.getContract_ym(),
                    officetelDeal.getContract_day(),
                    officetelDeal.getDealType(),
                    officetelDeal.getGuarantee(),
                    officetelDeal.getPrice(),
                    officetelDeal.getFloor(),
                    officetelDeal.getMonthly(),
                    officetelDeal.getOfficetelId()
            );
            String dealType = officetelDeal.getDealType();
            List<OfficetelDealDto> officetelDealList = DealMap.getOrDefault(dealType, new ArrayList<>());
            officetelDealList.add(officetelDealDto);
            DealMap.put(dealType, officetelDealList);
        }

        List<OfficetelDealTypeDto> DealTypeDtos = new ArrayList<>();
        for (Map.Entry<String, List<OfficetelDealDto>> entry : DealMap.entrySet()) {
            String dealType = entry.getKey();
            List<OfficetelDealDto> officetelDealList = entry.getValue();
            OfficetelDealTypeDto officetelDealTypeDto = new OfficetelDealTypeDto(dealType, officetelDealList);
            DealTypeDtos.add(officetelDealTypeDto);
        }
        return DealTypeDtos;
    }
}
