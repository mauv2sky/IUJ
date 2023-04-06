package com.iuj.backend.api.controller;

import com.iuj.backend.api.domain.enums.ErrorCode;
import com.iuj.backend.api.exception.CustomException;
import com.iuj.backend.api.service.NewsService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/news")
public class NewsController {
    private final NewsService newsService;

    @GetMapping("")
    @ApiOperation(value = "뉴스 api", notes = "메인 페이지에서 사용하는 news api")
    public ResponseEntity<Object> getPlaceList(Principal principal){
        try{
            if(principal == null) {
                return new ResponseEntity<>(newsService.getNewsList(), HttpStatus.OK);
            } else{
                return new ResponseEntity<>(newsService.getNewsListForUser(principal.getName()), HttpStatus.OK);
            }
        } catch (Exception e){
            e.printStackTrace();
            throw new CustomException(ErrorCode.NOTFOUND_NEWS);
        }
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "최근 본 뉴스 저장을 위한 api")
    public ResponseEntity<Object> setRecentViewNews(@PathVariable int id, Principal principal){
        try{
            if(principal != null){
                newsService.saveViewNews(id, principal.getName());
            }
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }
    }
}
