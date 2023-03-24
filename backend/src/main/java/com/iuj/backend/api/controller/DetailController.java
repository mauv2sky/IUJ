package com.iuj.backend.api.controller;

import com.iuj.backend.api.domain.dto.response.AptDto;
import com.iuj.backend.api.domain.dto.response.AptDealDto;

import com.iuj.backend.api.service.AptService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(value="/api/place")
public class DetailController {

    @Autowired
    private AptService aptService;


    @GetMapping("/apt/{id}")
    @ApiOperation(value="아파트 상세페이지 정보", notes="아파트 상세페이지 정보")
    public Map<String, Object> getApart(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        AptDto apartDTO = aptService.getApartById(id);
        List<AptDealDto> aptDealDTO = aptService.getDealByApartId(id);

        resultMap.put("apart", apartDTO);
        resultMap.put("deal", aptDealDTO);
        return resultMap;
    }

//    public ResponseEntity<Object> getAptList(@PathVariable Long id){
//        return new ResponseEntity<>(aptService.aptMethod(id), HttpStatus.OK);
//    }

//
//    @GetMapping("/apt/{id}/detail")
//    @ApiOperation(value="아파트 상세페이지 정보", notes="아파트 상세페이지 정보")
//    public ResponseEntity<Object> getAllApts(@PathVariable Long id){
//        return new ResponseEntity<>(aptService.getAllApts(id), HttpStatus.OK);
//    }

//    @GetMapping("/apt/{id}/detail")
//    @ApiOperation(value = "아파트 상세 페이지 거래내역", notes="아파트 상세 거래 내역 ")
//    public ResponseEntity<Object> getAptDetail(@PathVariable Long id){
//        System.out.println(aptDetailService.dealMethod(id));
//        return new ResponseEntity<>(aptDetailService.dealMethod(id), HttpStatus.OK);
//    }
}
