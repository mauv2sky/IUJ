package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.LikeBuildingDto;
import com.iuj.backend.api.domain.dto.response.MainSub;
import com.iuj.backend.api.domain.dto.response.RecommDto;
import com.iuj.backend.api.domain.entity.FavFilter;
import com.iuj.backend.api.domain.enums.Recomm;
import com.iuj.backend.api.repository.recomm.RecommRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RecommService {

    @Autowired
    private RecommRepository recommRepository;

    public List<Object> getAllRecommsByEmail(String authToken) {
        // authToken으로 email 받아와야함
        String email = "qwer"; // 임시로 email 값을 설정

        // 반환값을 담을 리스트
        // {recomm : [ {id:id, list: [ { main, sub }, {ms2}...]}, {객체2}... ] }
        List<Object> resultList = new ArrayList<>();

        List<FavFilter> recomms = recommRepository.findByEmail(email);

        for (FavFilter recomm : recomms) {
            Long id = recomm.getId();

            // [{main, sub}, {ms2},...]
            List<Object> list = new ArrayList<>();

            for (String value : Arrays.asList(recomm.getFirst(), recomm.getSecond(), recomm.getThird(), recomm.getFourth(), recomm.getFifth())) {
                if (value == null) {
                    // 예외 처리
                    continue;
                }
                Object obj = new MainSub(Recomm.findBySub(value).getMain(), value);
                list.add(obj);
            }

            // {id:id, list: [ { main, sub }, {ms2}...] }
            Map<String, Object> recommMap = new HashMap<>();
            recommMap.put("id", id);
            recommMap.put("list", list);

            // {recomm : [ {id:id, list: [ { main, sub }, {ms2}...]}, {객체2}... ] }
            resultList.add(recommMap);
        }
        return resultList;
    }

//    // 관심 매물 등록
//    public void addLike(LikeBuildingRequest request, String authToken) throws IllegalArgumentException {
//        // authToken으로 email 받아와야함
//        String email = "qwer"; // 임시로 email 값을 설정
//
//        // id와 type이 null인지 체크
//        if (request.getId() == null || request.getType() == null) {
//            throw new IllegalArgumentException("id and type are required.");
//        }
//
//        // id가 음수인 경우 예외 발생
//        if (request.getId() < 0) {
//            throw new IllegalArgumentException("id must be a positive integer.");
//        }
//
//        // XSS 공격 방어용 HTML 태그 제거
//        String type = HtmlUtils.htmlEscape(request.getType());
//
//        // 생성 후 저장
//        LikeBuilding searchBuilding = new LikeBuilding(request.getId(), type, email);
//        likeRepository.saveQuery(searchBuilding.getId(), searchBuilding.getType(), email);
//
//    }
//
//
//
//
//    // 관심 매물 삭제
//    public void delLike(LikeBuildingRequest request, String authToken) {
//        // authToken으로 email 받아와야함
//        String email = "qwer"; // 임시로 email 값을 설정
//
//        // XSS 공격 방어용 HTML 태그 제거
//        String type = HtmlUtils.htmlEscape(request.getType());
//
//        LikeBuilding searchBuilding = new LikeBuilding(request.getId(), type, email);
//        // 삭제
//        likeRepository.delete(searchBuilding);
//    }
}
