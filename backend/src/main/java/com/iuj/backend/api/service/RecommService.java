package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.request.DelRecommRequest;
import com.iuj.backend.api.domain.dto.request.RecommRequest;
import com.iuj.backend.api.domain.dto.response.MainSub;
import com.iuj.backend.api.domain.dto.response.RecommDto;
import com.iuj.backend.api.domain.entity.FavFilter;
import com.iuj.backend.api.domain.enums.Recomm;
import com.iuj.backend.api.repository.recomm.RecommRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

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

            Long id = recomm.getId();

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
        // authToken으로 email 받아와야함
        String email = "qwer"; // 임시로 email 값을 설정

        // 입력값이 null인지 체크
        if (request.getRecomm() == null) {
            throw new IllegalArgumentException("recomm is required.");
        }

        List<String> recommList = request.getRecomm();
        String[] recommArray = new String[5];
        for (int i = 0; i < recommList.size(); i++) {
            recommArray[i] = recommList.get(i);
//            System.out.println(recommArray[i]);
        }
        String first = recommArray[0];
        String second = recommArray[1];
        String third = recommArray[2];
        String fourth = recommArray[3];
        String fifth = recommArray[4];

        // 생성 후 저장
        FavFilter searchRecomm = new FavFilter(null, email, first, second, third, fourth, fifth);
        FavFilter savedRecomm = recommRepository.save(searchRecomm);

//        Hibernate: insert into fav_filter (email, fifth, first, fourth, second, third) values (?, ?, ?, ?, ?, ?)
//        2023-03-27 18:02:09.026  WARN 9608 --- [nio-5000-exec-2] o.h.engine.jdbc.spi.SqlExceptionHelper   : SQL Error: 1364, SQLState: HY000
//        2023-03-27 18:02:09.027 ERROR 9608 --- [nio-5000-exec-2] o.h.engine.jdbc.spi.SqlExceptionHelper   : Field 'id' doesn't have a default value

    }




    // 선호 필터 삭제
    public void delRecomm(DelRecommRequest request, String authToken) throws IllegalArgumentException {
        // authToken으로 email 받아와야함
        String email = "qwer"; // 임시로 email 값을 설정

        // id가 음수인 경우 예외 발생
        if (request.getId() < 0 || request.getId() == null) {
            throw new IllegalArgumentException("id must be a positive integer.");
        }

        // 값을 찾아서
        Object searchRecomm = recommRepository.findById(request.getId());
        System.out.println(searchRecomm);
        // 삭제
//        recommRepository.delete(searchRecomm);
    }
}
