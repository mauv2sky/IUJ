package com.iuj.backend.api.controller;

import com.iuj.backend.api.domain.dto.response.DealDto;
import com.iuj.backend.api.domain.entity.building.Apt;
import com.iuj.backend.api.service.AptDetailService;
import com.iuj.backend.api.service.AptService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value="/api/place")
public class DetailController {

    private final AptService aptService;
    private final AptDetailService aptDetailService;

    @GetMapping("/apt/{id}")
    @ApiOperation(value="아파트 상세페이지 정보", notes="아파트 상세페이지 정보")
    public ResponseEntity<Object> getAptList(@PathVariable Long id){
        return new ResponseEntity<>(aptService.aptMethod(id), HttpStatus.OK);
    }

    @GetMapping("/apt/{id}/detail")
    @ApiOperation(value = "아파트 상세 페이지 거래내역", notes="아파트 상세 거래 내역 ")
    public ResponseEntity<Object> getAptDetail(@PathVariable Long id){
        System.out.println(aptDetailService.dealMethod(id));
        return new ResponseEntity<>(aptDetailService.dealMethod(id), HttpStatus.OK);
    }
}
