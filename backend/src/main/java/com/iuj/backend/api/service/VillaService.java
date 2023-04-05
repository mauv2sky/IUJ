package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.*;
import com.iuj.backend.api.domain.entity.building.Officetel;
import com.iuj.backend.api.domain.entity.building.OfficetelDeal;
import com.iuj.backend.api.domain.entity.building.Villa;
import com.iuj.backend.api.domain.entity.building.VillaDeal;
import com.iuj.backend.api.repository.building.OfficetelDealRepository;
import com.iuj.backend.api.repository.building.VillaDealRepository;
import com.iuj.backend.api.repository.building.VillaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VillaService {
    private final VillaRepository villaRepository;
    private final VillaDealRepository villaDealRepository;

    // officetel ID로 해당 건물의 정보를 반환
    public VillaDto getVillaById(Long id){
        Villa villa = villaRepository.findById(id).get();
        if(villa == null){
            return null;
        }
        VillaDto villaDto = new VillaDto(villa);
        return villaDto;
    }

//     건물 아이디로 거래 정보 반환
    public List<VillaDealTypeDto> getDealByVillaId(Long id){
        Map<String, List<VillaDealDto>> DealMap = new HashMap<>();
        List<VillaDeal> deals = villaDealRepository.findByVillaId(id);

        for (VillaDeal villaDeal : deals) {
            VillaDealDto villaDealDto = new VillaDealDto(
                    villaDeal.getId(),
                    villaDeal.getArea(),
                    villaDeal.getContract_ym(),
                    villaDeal.getContract_day(),
                    villaDeal.getDealType(),
                    villaDeal.getGuarantee(),
                    villaDeal.getPrice(),
                    villaDeal.getFloor(),
                    villaDeal.getMonthly(),
                    villaDeal.getVillaId()
            );
            String dealType = villaDeal.getDealType();
            List<VillaDealDto> villaDealList = DealMap.getOrDefault(dealType, new ArrayList<>());
            villaDealList.add(villaDealDto);
            DealMap.put(dealType, villaDealList);
        }

        List<VillaDealTypeDto> DealTypeDtos = new ArrayList<>();
        for (Map.Entry<String, List<VillaDealDto>> entry : DealMap.entrySet()) {
            String dealType = entry.getKey();
            List<VillaDealDto> villaDealList = entry.getValue();
            VillaDealTypeDto villaDealTypeDto = new VillaDealTypeDto(dealType, villaDealList);
            DealTypeDtos.add(villaDealTypeDto);
        }
        return DealTypeDtos;
    }


    public Map<String, List<Integer>> getPriceDataByDealType() {
        List<VillaDeal> deals = villaDealRepository.findAll();
        Map<String, List<Integer>> dataMap = new HashMap<>();

        for (VillaDeal deal : deals) {
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


    public Object[] createVillaDealArray(List<VillaDeal> villaDealList) {
        Object[] array = new Object[12];
        Arrays.fill(array, null);

        List<VillaDealTypeDto> resultList = new ArrayList<>();

        Map<String, List<VillaDeal>> villaDealByMonth = villaDealList.stream()
                .collect(Collectors.groupingBy(deal -> deal.getContract_ym()));

        for (int month = 1; month <= 12; month++) {
            List<VillaDeal> dealsInMonth = villaDealByMonth.get(String.valueOf(month));
            if (dealsInMonth != null) {
                int numDeals = dealsInMonth.size();

                Double[] prices = new Double[numDeals];
                Double[] guarantees = new Double[numDeals];
                Double[] guaranteeMoneys = new Double[numDeals];

                for (int i = 0; i < numDeals; i++) {
                    VillaDeal deal = dealsInMonth.get(i);
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

                List<VillaDealDto> avgGuaranteeList = Arrays.stream(guarantees)
                        .filter(guarantee -> guarantee != null)
                        .map(guarantee -> new VillaDealDto(
                                0, "", "", "", "", guarantee.intValue(), 0, 0, 0, null))
                        .collect(Collectors.toList());

                VillaDealTypeDto dto = new VillaDealTypeDto(String.valueOf(avgPrice), avgGuaranteeList);
                dto.setType(String.valueOf(month));
                resultList.add(dto);
            }
        }

        return array;
    }
}
