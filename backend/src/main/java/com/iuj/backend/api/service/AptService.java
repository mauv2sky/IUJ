package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.AptDto;
import com.iuj.backend.api.domain.dto.response.AptDealDto;
import com.iuj.backend.api.domain.entity.building.Apt;
import com.iuj.backend.api.domain.entity.building.AptDeal;
import com.iuj.backend.api.repository.building.AptDealRepository;
import com.iuj.backend.api.repository.building.AptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AptService {
    private final AptRepository aptRepository;
    private final AptDealRepository aptDealRepository;
//    public DealDto dealMethod(Long id){
//        AptDeal apt = dealRepository.findById(id).get();
////        System.out.println(apt.toString());
//        return new DealDto(apt);
//    }
//
//    public AptDto aptMethod(Long id){
//        Apt apt = aptRepository.findById(id).get();
//        return new AptDto(apt);
//    }
    public AptDto getApartById(Long id) {
        Apt apart = aptRepository.findById(id).get();
        if (apart == null) {
            return null;
        }
        AptDto apartDTO = new AptDto(apart);
        return apartDTO;
    }
    public List<AptDealDto> getDealByApartId(Long id) {
        List<AptDeal> deal = aptDealRepository.findByAptId(id);
        if (deal == null) {
            return null;
        }

        List<AptDealDto> list = new ArrayList<>();
        deal.forEach(d -> {
            AptDealDto aptDealDTO = new AptDealDto(d);
            list.add(aptDealDTO);
        });

        return list;
    }

}


