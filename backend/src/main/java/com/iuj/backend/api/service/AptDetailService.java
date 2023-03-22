package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.DealDto;
import com.iuj.backend.api.domain.entity.building.AptDeal;
import com.iuj.backend.api.repository.building.DealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AptDetailService {
    private final DealRepository dealRepository;

    public DealDto dealMethod(Long id){
        AptDeal apt = dealRepository.findById(id).get();
//        System.out.println(apt.toString());
        return new DealDto(apt);
    }
}
