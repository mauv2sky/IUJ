package com.iuj.backend.api.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import com.iuj.backend.api.domain.dto.request.LikeBuildingRequest;
import com.iuj.backend.api.domain.dto.response.AptDto;
import com.iuj.backend.api.domain.dto.response.LikeBuildingDto;
import com.iuj.backend.api.domain.entity.building.Apt;
import com.iuj.backend.api.domain.entity.building.Officetel;
import com.iuj.backend.api.domain.entity.building.Villa;
import com.iuj.backend.api.repository.building.*;
import org.aspectj.apache.bcel.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iuj.backend.api.domain.entity.LikeBuilding;
import com.iuj.backend.api.repository.like.LikeRepository;
import org.springframework.web.util.HtmlUtils;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private AptRepository aptRepository;

    @Autowired
    private VillaRepository villaRepository;

    @Autowired
    private OfficetelRepository officetelRepository;

//    @Autowired
//    private AptDealRepository aptDealRepository;

//    @Autowired
//    private VillaDealRepository villaDealRepository;

//    @Autowired
//    private OfficetelDealRepository officetelDealRepository;

    public List<LikeBuildingDto> getAllLikesByEmail(String authToken) {
        // authToken으로 email 받아와야함
        String email = "qwer"; // 임시로 email 값을 설정

        // 반환값을 담을 리스트
        List<LikeBuildingDto> result = new ArrayList<>();

        //
        List<LikeBuilding> likeBuildings = likeRepository.findByEmail(email);
        //System.out.println(likeRepository.findByEmail(email));

        for (LikeBuilding likeBuilding : likeBuildings) {
            //System.out.println(likeBuilding);
            Long id = likeBuilding.getId();
            String type = likeBuilding.getType();

            if ("APT".equals(type)) {
                Apt existingLike = aptRepository.findById(id).get();

                String name = existingLike.getName();

                String old_address = existingLike.getSigungu() + " " + existingLike.getBungi();

                List<String> address = new ArrayList<>(Arrays.asList(existingLike.getRoad_addr(), old_address));

                LikeBuildingDto searchBuilding = new LikeBuildingDto(name, address, type, id);

                result.add(searchBuilding);
            } else if ("VILLA".equals(type)) {
                Villa existingLike = villaRepository.findById(id).get();

                String name = existingLike.getName();

                String old_address = existingLike.getSigungu() + " " + existingLike.getBungi();

                List<String> address = new ArrayList<>(Arrays.asList(existingLike.getRoad_addr(), old_address));

                LikeBuildingDto searchBuilding = new LikeBuildingDto(name, address, type, id);

                result.add(searchBuilding);
            } else if ("OFFICETEL".equals(type)) {
                Officetel existingLike = officetelRepository.findById(id).get();

                String name = existingLike.getName();

                String old_address = existingLike.getSigungu() + " " + existingLike.getBungi();

                List<String> address = new ArrayList<>(Arrays.asList(existingLike.getRoad_addr(), old_address));

                LikeBuildingDto searchBuilding = new LikeBuildingDto(name, address, type, id);

                result.add(searchBuilding);
            }
        }
        return result;
    }

    // 관심 매물 등록
    public void addLike(LikeBuildingRequest request, String authToken) throws IllegalArgumentException {
        // authToken으로 email 받아와야함
        String email = "qwer"; // 임시로 email 값을 설정

        // id와 type이 null인지 체크
        if (request.getId() == null || request.getType() == null) {
            throw new IllegalArgumentException("id and type are required.");
        }

        // id가 음수인 경우 예외 발생
        if (request.getId() < 0) {
            throw new IllegalArgumentException("id must be a positive integer.");
        }

        // XSS 공격 방어용 HTML 태그 제거
        String type = HtmlUtils.htmlEscape(request.getType());

        // 생성 후 저장
        LikeBuilding searchBuilding = new LikeBuilding(request.getId(), type, email);
        likeRepository.saveQuery(searchBuilding.getId(), searchBuilding.getType(), email);

    }



    
    // 관심 매물 삭제
    public void delLike(LikeBuildingRequest request, String authToken) {
        // authToken으로 email 받아와야함
        String email = "qwer"; // 임시로 email 값을 설정

        // XSS 공격 방어용 HTML 태그 제거
        String type = HtmlUtils.htmlEscape(request.getType());

        LikeBuilding searchBuilding = new LikeBuilding(request.getId(), type, email);
        // 삭제
        likeRepository.delete(searchBuilding);
    }
}
