package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.AptDto;
import com.iuj.backend.api.domain.entity.building.Apt;
import com.iuj.backend.api.repository.building.AptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AptService {

    private final AptRepository aptRepository;

    public AptDto aptMethod(Long id){
        Apt apt = aptRepository.findById(id).get();
        return new AptDto(apt);
    }
}
