package com.iuj.backend.util;

import com.iuj.backend.api.domain.entity.building.Score;
import com.iuj.backend.api.domain.enums.Recomm;


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
//            int cctvScore = score.getCctv();
            int policeScore = score.getPolice();
            return policeScore;
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
            }
        }

        return 0;
    }
    public static double getTotalScore(Score score){

        return 1;
    }
    public static double getTotalScoreByRecomm(LinkedHashMap<String, Integer> linkedHashMap, Score scoreData){
        int recommSize = linkedHashMap.size();
        int denum = (int) ((recommSize+1)*(recommSize/2.0));
        int factor = recommSize;
        int sum = 0;

        for(String key : linkedHashMap.keySet()){
            sum += factor * linkedHashMap.get(key);
            factor--;
        }

        System.out.println(denum);
        System.out.println(sum);

        double recommScore = sum / denum;
        double totalScore = getTotalScore(scoreData);
        return (recommScore + totalScore) / 2;
    }

}
