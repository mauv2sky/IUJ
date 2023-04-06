package com.iuj.backend.util;

import com.iuj.backend.api.domain.entity.FavFilter;
import com.iuj.backend.api.domain.enums.NewsCategory;
import com.iuj.backend.api.domain.enums.Recomm;

import java.util.*;

public class NewsUtil {
    public static NewsCategory getCategory(List<FavFilter> favFilters){
        NewsCategory category = NewsCategory.getRandom();

        if(favFilters != null){
            List<String> recommStringList = new ArrayList<>();
            for(FavFilter f : favFilters){
                recommStringList.add(f.getFirst());
                recommStringList.add(f.getSecond());
                recommStringList.add(f.getThird());
                recommStringList.add(f.getFourth());
                recommStringList.add(f.getFifth());
            }
            recommStringList.removeAll(Collections.singletonList(null));
            Map<NewsCategory, Integer> recommList = new HashMap<>();
            for(String s : recommStringList){
                Recomm r = Recomm.findBySub(s);
                if(r.getMain().equals("학군")){
                    if(r == Recomm.EDU_ACADEMY || r == Recomm.ENTERTAINMENT_ACADEMY) {
                        return category;
//                        recommList.put(NewsCategory.ACADEMY, recommList.containsKey(NewsCategory.ACADEMY) ? recommList.get(NewsCategory.ACADEMY)+1 : 1);
                    } else{
                    recommList.put(NewsCategory.findByName(r.getSub()), recommList.containsKey(NewsCategory.findByName(r.getSub()))? recommList.get(NewsCategory.findByName(r.getSub())) + 1  : 1);
                    }

                }
            }

            if(!recommList.isEmpty()) {
                int maxValue = Collections.max(recommList.values());
                for (Map.Entry<NewsCategory, Integer> m : recommList.entrySet()) {
                    if (m.getValue() == maxValue) {
                        category = m.getKey();
                        System.out.println(m.getKey());
                    }
                }
            }
        }

        return category;
    }
}
