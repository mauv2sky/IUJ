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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
}
