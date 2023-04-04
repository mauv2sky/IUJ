package com.iuj.backend.api.service;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuj.backend.api.domain.dto.response.AptDealTypeDto;
import com.iuj.backend.api.domain.dto.response.AptDto;
import com.iuj.backend.api.domain.dto.response.AptDealDto;
import com.iuj.backend.api.domain.entity.building.Apt;
import com.iuj.backend.api.domain.entity.building.AptDeal;
import com.iuj.backend.api.domain.enums.DealType;
import com.iuj.backend.api.repository.building.AptDealRepository;
import com.iuj.backend.api.repository.building.AptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.sql.SQLOutput;
import java.util.*;
import java.util.stream.Collectors;

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


    public Map<String, List<Integer>> getPriceDataByDealType() {
        List<AptDeal> deals = aptDealRepository.findAll();
        Map<String, List<Integer>> dataMap = new HashMap<>();

        for (AptDeal deal : deals) {
            String dealType = deal.getDealType();
            int price = deal.getPrice();

            if (dataMap.containsKey(dealType)) {
                List<Integer> dataList = dataMap.get(dealType);
                dataList.add(price);
            } else {
                List<Integer> dataList = new ArrayList<>();
                dataList.add(price);
                dataMap.put(dealType, dataList);
            }
        }

        return dataMap;
    }


    public Object[] createAptDealArray(List<AptDeal> aptDealList) {
        Object[] array = new Object[12];
        Arrays.fill(array, null);

        List<AptDealTypeDto> resultList = new ArrayList<>();

        Map<String, List<AptDeal>> aptDealByMonth = aptDealList.stream()
                .collect(Collectors.groupingBy(deal -> deal.getContract_ym()));

        for (int month = 1; month <= 12; month++) {
            List<AptDeal> dealsInMonth = aptDealByMonth.get(String.valueOf(month));
            if (dealsInMonth != null) {
                int numDeals = dealsInMonth.size();

                Double[] prices = new Double[numDeals];
                Double[] guarantees = new Double[numDeals];
                Double[] guaranteeMoneys = new Double[numDeals];

                for (int i = 0; i < numDeals; i++) {
                    AptDeal deal = dealsInMonth.get(i);
                    System.out.println(deal);
                    switch (deal.getDealType()) {
                        case "매매":
                            prices[i] = (double) deal.getPrice();
                            guarantees[i] = null;
                            guaranteeMoneys[i] = null;
                            break;
                        case "전세":
                            prices[i] = null;
                            guarantees[i] = (double) deal.getGuarantee();
                            guaranteeMoneys[i] = null;
                            break;
                        case "월세":
                            prices[i] = null;
                            guarantees[i] = null;
                            guaranteeMoneys[i] = (double) deal.getGuarantee();
                            break;
                    }
                }

                Double avgPrice = Arrays.stream(prices)
                        .filter(price -> price != null)
                        .mapToDouble(price -> price)
                        .average().orElse(Double.NaN);

                List<AptDealDto> avgGuaranteeList = Arrays.stream(guarantees)
                        .filter(guarantee -> guarantee != null)
                        .map(guarantee -> new AptDealDto(
                                0, "", "", "", "", guarantee.intValue(), 0, 0, 0, null))
                        .collect(Collectors.toList());

                AptDealTypeDto dto = new AptDealTypeDto(String.valueOf(avgPrice), avgGuaranteeList);
                dto.setType(String.valueOf(month));
                resultList.add(dto);

            }
        }

        return array;
    }





}