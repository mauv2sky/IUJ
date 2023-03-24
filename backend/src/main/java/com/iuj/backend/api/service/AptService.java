package com.iuj.backend.api.service;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuj.backend.api.domain.dto.response.AptDealTypeDto;
import com.iuj.backend.api.domain.dto.response.AptDto;
import com.iuj.backend.api.domain.dto.response.AptDealDto;
import com.iuj.backend.api.domain.entity.building.Apt;
import com.iuj.backend.api.domain.entity.building.AptDeal;
import com.iuj.backend.api.repository.building.AptDealRepository;
import com.iuj.backend.api.repository.building.AptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AptService {
    private final AptRepository aptRepository;
    private final AptDealRepository aptDealRepository;


    //   apart ID로 해당 건물의 정보
    public AptDto getApartById(Long id) {
        Apt apart = aptRepository.findById(id).get();
        if (apart == null) {
            return null;
        }
        AptDto apartDTO = new AptDto(apart);
        return apartDTO;
    }

    public List<AptDealTypeDto> getDealByApartId(Long id) {
        Map<String, List<AptDealDto>> DealMap = new HashMap<>();
        List<AptDeal> deals = aptDealRepository.findByAptId(id);
        System.out.println(deals);
        for (AptDeal aptDeal : deals) {
            AptDealDto aptDealDto = new AptDealDto(
                    aptDeal.getId(),
                    aptDeal.getArea(),
                    aptDeal.getContract_ym(),
                    aptDeal.getContract_day(),
                    aptDeal.getDealType(),
                    aptDeal.getGuarantee(),
                    aptDeal.getPrice(),
                    aptDeal.getFloor(),
                    aptDeal.getMonthly(),
                    aptDeal.getAptId()
            );
            String dealType = aptDeal.getDealType();
            List<AptDealDto> aptDealList = DealMap.getOrDefault(dealType, new ArrayList<>());
            aptDealList.add(aptDealDto);
            DealMap.put(dealType, aptDealList);
        }

        List<AptDealTypeDto> DealTypeDtos = new ArrayList<>();
        for (Map.Entry<String, List<AptDealDto>> entry : DealMap.entrySet()) {
            String dealType = entry.getKey();
            List<AptDealDto> aptDealList = entry.getValue();
            AptDealTypeDto aptDealTypeDto = new AptDealTypeDto(dealType, aptDealList);
            DealTypeDtos.add(aptDealTypeDto);
        }
        return DealTypeDtos;
    }

//       apart ID로 해당 건물의 거래내역
//    public List<AptDealDto> getDealByApartId(Long id) {
//        List<AptDeal> deal = aptDealRepository.findByAptId(id);
//        if (deal == null) {
//            return null;
//        }
//
//        List<AptDealDto> list = new ArrayList<>();
//        deal.forEach(d -> {
//            AptDealDto aptDealDTO = new AptDealDto(d);
//            list.add(aptDealDTO);
//        });
//
//        return list;
//    }

}


