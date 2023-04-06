package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.entity.FavFilter;
import com.iuj.backend.api.domain.entity.News;
import com.iuj.backend.api.domain.entity.SearchRegion;
import com.iuj.backend.api.domain.enums.NewsCategory;
import com.iuj.backend.api.domain.enums.Sido;
import com.iuj.backend.api.repository.NewsRepository;
import com.iuj.backend.api.repository.SearchRegionRepository;
import com.iuj.backend.api.repository.recomm.RecommRepository;
import com.iuj.backend.util.NewsUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class NewsService {

    private final RecommRepository recommRepository;
    private final NewsRepository newsRepository;
    private final SearchRegionRepository searchRegionRepository;

    /**
     * 로그인하지 않은 유저 - 메인에서 보여줄 뉴스 리스트
     * */
    public List<News> getNewsList(){
        List<News> list = newsRepository.getTop6BySchoolAndLocalEquals(NewsCategory.getRandom().getName(), Sido.ALL.getName());
        return list;
    }

    /**
     * 로그인한 유저 - 메인에서 보여줄 뉴스 리스트
     * */
    public List<News> getNewsListForUser(String email){
        List<News> result;
        
        // 선호필터 중 가장 많이 등록된 학군 카테고리로 뉴스 카테고리 가져오기
        List<FavFilter> favFilters = recommRepository.findByEmail(email);
        NewsCategory category = NewsUtil.getCategory(favFilters);

        // 최근 검색 지역, 없을경우 전국으로 자동 설정
        SearchRegion region = searchRegionRepository.findById(email).orElse(null);
        Sido sido = Sido.findByName(region != null ? region.getSido() : null);
        result = newsRepository.getTop6BySchoolAndLocalEquals(category.getName(), sido.getName());

        return result;
    }
}
