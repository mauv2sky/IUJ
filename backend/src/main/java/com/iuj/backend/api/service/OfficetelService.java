package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.*;
import com.iuj.backend.api.domain.entity.building.AptDeal;
import com.iuj.backend.api.domain.entity.building.Officetel;
import com.iuj.backend.api.domain.entity.building.OfficetelDeal;
import com.iuj.backend.api.repository.building.OfficetelDealRepository;
import com.iuj.backend.api.repository.building.OfficetelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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

    public Map<String, List<Integer>> getPriceDataByDealType() {
        List<OfficetelDeal> deals = officetelDealRepository.findAll();
        Map<String, List<Integer>> dataMap = new HashMap<>();

        for (OfficetelDeal deal : deals) {
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


    public Object[] createOfficetelDealArray(List<OfficetelDeal> officetelDealList) {
        Object[] array = new Object[12];
        Arrays.fill(array, null);

        List<OfficetelDealTypeDto> resultList = new ArrayList<>();

        Map<String, List<OfficetelDeal>> officetelDealByMonth = officetelDealList.stream()
                .collect(Collectors.groupingBy(deal -> deal.getContract_ym()));

        for (int month = 1; month <= 12; month++) {
            List<OfficetelDeal> dealsInMonth = officetelDealByMonth.get(String.valueOf(month));
            if (dealsInMonth != null) {
                int numDeals = dealsInMonth.size();

                Double[] prices = new Double[numDeals];
                Double[] guarantees = new Double[numDeals];
                Double[] guaranteeMoneys = new Double[numDeals];

                for (int i = 0; i < numDeals; i++) {
                    OfficetelDeal deal = dealsInMonth.get(i);
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

                List<OfficetelDealDto> avgGuaranteeList = Arrays.stream(guarantees)
                        .filter(guarantee -> guarantee != null)
                        .map(guarantee -> new OfficetelDealDto(
                                0, "", "", "", "", guarantee.intValue(), 0, 0, 0, null))
                        .collect(Collectors.toList());

                OfficetelDealTypeDto dto = new OfficetelDealTypeDto(String.valueOf(avgPrice), avgGuaranteeList);
                dto.setType(String.valueOf(month));
                resultList.add(dto);
            }
        }

        return array;
    }
}
