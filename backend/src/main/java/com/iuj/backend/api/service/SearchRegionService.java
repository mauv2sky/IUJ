package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.entity.SearchRegion;
import com.iuj.backend.api.domain.enums.Sido;
import com.iuj.backend.api.repository.SearchRegionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchRegionService {
    private final SearchRegionRepository searchRegionRepository;

    /**
     * 최근 검색내역 저장
     * 
     * @param email 이메일
     * @param address 주소
     * */
    public void setRecentSearchRegion(String email, String address){
        Sido sido = Sido.findByName(address.split(" ")[0]);
        searchRegionRepository.save(
                SearchRegion.builder()
                        .email(email)
                        .sido(sido.getName())
                .build());
    }
}
