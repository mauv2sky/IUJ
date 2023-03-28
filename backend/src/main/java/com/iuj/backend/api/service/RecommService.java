package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.request.DelRecommRequest;
import com.iuj.backend.api.domain.dto.request.RecommRequest;
import com.iuj.backend.api.domain.dto.response.MainSub;
import com.iuj.backend.api.domain.entity.FavFilter;
import com.iuj.backend.api.domain.enums.Recomm;
import com.iuj.backend.api.repository.recomm.RecommRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.*;

@Service
public class RecommService {

    @Autowired
    private RecommRepository recommRepository;

    // 선호 필터 조회
    public List<Object> getAllRecommsByEmail(String authToken) {
        // authToken으로 email 받아와야함
        String email = "qwer"; // 임시로 email 값을 설정

        // 반환값을 담을 리스트
        // {recomm : [ {id:id, list: [ { main, sub }, {ms2}...]}, {객체2}... ] }
        List<Object> resultList = new ArrayList<>();

        List<FavFilter> recomms = recommRepository.findByEmail(email);

        for (FavFilter recomm : recomms) {

            BigInteger id = recomm.getId();

            // [{main, sub}, {ms2},...]
            List<Object> list = new ArrayList<>();

            for (String value : Arrays.asList(recomm.getFirst(), recomm.getSecond(), recomm.getThird(), recomm.getFourth(), recomm.getFifth())) {
                if (value != null) {
                    Object obj = new MainSub(Recomm.findBySub(value).getMain(), value);
                    list.add(obj);
                }
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

    // 선호 필터 등록
    public void addRecomm(RecommRequest request, String authToken) throws IllegalArgumentException {
        // 입력값이 없는지 체크
        if (request.getRecomm().isEmpty()) {
            throw new IllegalArgumentException("recomm is required.");
        }

        // 허용 문자열 목록
        List<String> allowedValues = Arrays.asList(null, "어린이집", "유치원", "초등학교", "중학교", "고등학교", "특수학교", "입시학원", "예체능학원",
        "지하철", "버스", "편의점", "마트", "병원", "치안", "공원", "영화관", "서점", "미술관");

        List<String> recommList = request.getRecomm();
        String[] recommArray = new String[5];
        for (int i = 0; i < recommList.size(); i++) {
            recommArray[i] = recommList.get(i);
        // System.out.println(recommArray[i]);
        }
        String first = recommArray[0];
        String second = recommArray[1];
        String third = recommArray[2];
        String fourth = recommArray[3];
        String fifth = recommArray[4];

        // 문자열이 허용되는 목록에 포함되어 있는지 검사
        if (!allowedValues.contains(first) ||
                !allowedValues.contains(second) ||
                !allowedValues.contains(third) ||
                !allowedValues.contains(fourth) ||
                !allowedValues.contains(fifth)) {
            throw new IllegalArgumentException("Invalid value for recomm.");
        }

        // authToken으로 email 받아와야함
        String email = "qwer"; // 임시로 email 값을 설정

        // 해당 이메일을 가진 모든 선호 필터 데이터 검색
        List<FavFilter> existingRecomms = recommRepository.findByEmail(email);
        // System.out.println(existingRecomms);
        // [FavFilter(id=13, first=지하철, second=null, third=null, fourth=null, fifth=null)]

        // 중복여부를 판단하는 변수
        boolean isDuplicate = false;

        // existingRecomms 리스트를 순회하면서 중복된 데이터가 있는지 확인
        for (FavFilter existingRecomm : existingRecomms) {
            if (Objects.equals(existingRecomm.getFirst(), first) &&
                    Objects.equals(existingRecomm.getSecond(), second) &&
                    Objects.equals(existingRecomm.getThird(), third) &&
                    Objects.equals(existingRecomm.getFourth(), fourth) &&
                    Objects.equals(existingRecomm.getFifth(), fifth)) {

                // 중복된 데이터가 있으면 isDuplicate 변수를 true로 변경
                isDuplicate = true;
                break;
            }
        }

        // 중복된 데이터가 없으면 db에 값을 추가
        if (!isDuplicate) {
            // existingRecomms 리스트의 크기가 5이면 첫번째(오래된) 데이터를 삭제
            if (existingRecomms.size() > 4) {
                recommRepository.deleteById(existingRecomms.get(0).getId());
            }
            // 새로운 선호 필터 데이터 생성 및 저장
            FavFilter newRecomm = new FavFilter(null, email, first, second, third, fourth, fifth);
            recommRepository.save(newRecomm);
        }
    }


    // 선호 필터 삭제
    public void delRecomm(DelRecommRequest request, String authToken) {
        // authToken으로 email 받아와야함
        String email = "qwer"; // 임시로 email 값을 설정

        // 값을 찾아서
        FavFilter searchRecomm = recommRepository.findById_(request.getId());
        // System.out.println(searchRecomm);
        // FavFilter(id=3, email=qwer, first=치안, second=지하철, third=마트, fourth=초등학교, fifth=null)

        // email과 일치하면
        if (searchRecomm.getEmail().equals(email)) {
        // 삭제
            recommRepository.delete(searchRecomm);
        }
    }
}
