package com.iuj.backend.util;

import com.iuj.backend.api.domain.entity.building.Score;
import com.iuj.backend.api.domain.enums.Recomm;


import java.util.EnumSet;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public class ScoreUtil {

    public static LinkedHashMap<String, Integer> getScoreMap(List<Recomm> recomm, Score scoreData){
        LinkedHashMap<String, Integer> score = new LinkedHashMap<>();
        for(Recomm r : recomm){
            score.put(r.getSub(), ScoreUtil.getOneScoreByRecomm(r, scoreData));
        }
        return score;
    }

    public static int getOneScoreByRecomm(Recomm category, Score score){
        if(category.equals(Recomm.SAFETY)){
            // 계산하기
            int cctvScore = score.getCctv();
            int policeScore = score.getPolice();
            int safeConviScore = score.getSafeConvi();

            double totalScore = (cctvScore * 0.4 + policeScore * 0.1 + safeConviScore * 0.5) * 1.3;
            return totalScore > 100 ? 100 : (int) totalScore;
        } else {
            switch (category){
                case NURSERY:
                    return score.getNursery();
                case KINDERGARTEN:
                    return score.getKindergarten();
                case ELEMENTARY_SCHOOL:
                    return score.getElementaryScool();
                case MIDDLE_SCHOOL:
                    return score.getMiddleSchool();
                case HIGH_SCHOOL:
                    return score.getHighSchool();
                case SPECIAL_SCHOOL:
                    return score.getSpecialSchool();
                case EDU_ACADEMY:
                    return score.getEduAcademy();
                case ENTERTAINMENT_ACADEMY:
                    return score.getEntertainmentAcademy();
                case BOOKSTORE:
                    return score.getBookstore();
                case CINEMA:
                    return score.getCinema();
                case GALLERY:
                    return score.getArtGallery();
                case PARK:
                    return score.getPark();
                case SUBWAY:
                    return score.getSubway();
                case BUS_STOP:
                    return score.getBusStop();
                case HOSPITAL:
                    return score.getHospital();
                case SHOPPING:
                    return score.getSupermarket();
                case CONVENIENCE_STORE:
                    return score.getConvi();
                case LIBRARY:
                    return score.getLibrary();
                case PUBLIC_OFFICE:
                    return score.getPublicOffice();
            }
        }

        return 0;
    }

    /**
     * 전체 기본점수 계산에 이용되는 선호별 점수 계산 비중 (각 점수에 곱해질 인자)
     * main 카테고리의 모든 상세 카테고리의 비중을 더하면 1이 됨
     * ex)
     * [when] main1에 cate1~3, main2에 cate4
     * [then] "cate1":0.5, "cate2": 0.1, "cate3": 0.4  => 1
     * "cate4": 1.0 => 1
     *
     * @return HashMap
     * */
    private static HashMap<Recomm, Double> getFactor(){
        HashMap<Recomm, Double> factorMap = new HashMap<>();
        HashMap<String, Integer> countMap = new HashMap<>();

        // 메인카테고리별 서브 카테고리 개수 계산
        for(Recomm r : EnumSet.allOf(Recomm.class)){
            if(!countMap.containsKey(r.getMain())){
                countMap.put(r.getMain(), 1);
            } else {
                countMap.put(r.getMain(), countMap.get(r.getMain())+1);
            }
        }

        // 서브 카테고리별 점수 비중 계산
        for(Recomm r : EnumSet.allOf(Recomm.class)){
            factorMap.put(r, 1.0 / countMap.get(r.getMain()));
        }
        return factorMap;
    }

    public static double getBasicScore(Score scoreData){
        double result = 0;
        HashMap<Recomm, Double> factorMap = getFactor();

        for(Recomm r : EnumSet.allOf(Recomm.class)){
            int tmp = getOneScoreByRecomm(r, scoreData);

            if(!factorMap.containsKey(r)){
                throw new IllegalArgumentException();
            } else{
                result += factorMap.get(r) * tmp;
            }
        }
        return result / 5;
    }

    public static double getTotalScoreByRecomm(LinkedHashMap<String, Integer> linkedHashMap, Score scoreData){
        double result;

        int recommSize = linkedHashMap.size();
        int denum = (int) ((recommSize+1)*(recommSize/2.0));
        int factor = recommSize;
        int sum = 0;

        for(String key : linkedHashMap.keySet()){
            sum += factor * linkedHashMap.get(key);
            factor--;
        }

        double recommScore = (double) sum / denum;
        double basicScore = getBasicScore(scoreData);
        result = Math.round(((recommScore*0.7 + basicScore*0.3))*100)/100.0;
        return result;

    }

}
