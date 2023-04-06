package com.iuj.backend.api.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.EnumSet;

@Getter
@AllArgsConstructor
public enum Sido {
//    '서울', '부산', '인천', '대구', '대전', '광주', '울산', '세종시', '경기도', '강원도', '충청북도','충북', '충청남도','충남', '전라북도','전북', '전라남도','전남', '경상북도','경북', '경상남도','경남', '제주'
    ALL("전국"),
    SEOUL("서울특별시"),
    SEJONG("세종특별자치시"),
    INCHEON("인천광역시"),
    DAEJEON("대전광역시"),
    GWANGJU("광주광역시"),
    DAEGU("대구광역시"),
    ULSAN("울산광역시"),
    BUSAN("부산광역시"),
    GYEONGGI("경기도"),
    GANGWON("강원도"),
    CHUNGBUK("충청북도"),
    CHUNGNAM("충청남도"),
    JEONBUK("전라북도"),
    JEONNAM("전라남도"),
    GYEONGBUK("경상북도"),
    GYEONGNAM("경상남도")
    ;

    private final String name;

    public static Sido findByName(String name){
        return EnumSet.allOf(Sido.class).stream()
                .filter(e->e.getName().equals(name))
                .findAny()
                .orElse(Sido.ALL);
    }

}
