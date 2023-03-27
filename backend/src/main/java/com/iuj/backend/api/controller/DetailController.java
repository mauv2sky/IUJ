package com.iuj.backend.api.controller;

import com.iuj.backend.api.domain.dto.response.*;

import com.iuj.backend.api.service.*;
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
    private final AptService aptService;
    private final TrafficService trafficService;
    private final SchoolService schoolService;
    private final AcademyService academyService;
    private final SafeService safeService;

    @GetMapping("/apt/{id}")
    @ApiOperation(value="아파트 상세페이지 정보", notes="아파트 상세페이지 정보")
    public Map<String, Object> getApart(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        Map<String, Object> trafficMap = new HashMap<>();
        Map<String, Object> safeMap = new HashMap<>();
        AptDto apartDTO = aptService.getApartById(id);
        List<AptDealTypeDto> aptDealTypeDTO = aptService.getDealByApartId(id);
//      교통
        List<BusStopDto> busStopDTO = trafficService.findNearbyBusStops(apartDTO.getLat(), apartDTO.getLng());
        List<SubwayDto> subwayDTO = trafficService.findNearbySubways(apartDTO.getLat(), apartDTO.getLng());

//        학군
        List<SchoolTypeDto> schoolDto = schoolService.findNearBySchool(apartDTO.getLat(), apartDTO.getLng());
        List<AcademyTypeDto> academyDto = academyService.findNearByAcademy(apartDTO.getLat(), apartDTO.getLng());
//       치안
        List<CctvDto> cctvDto = safeService.findNearbyCctvs(apartDTO.getLat(), apartDTO.getLng());
        List<PoliceDto> policeDto = safeService.findNearbyPolices(apartDTO.getLat(), apartDTO.getLng());

        resultMap.put("apart", apartDTO);
        resultMap.put("deal", aptDealTypeDTO);
//
        trafficMap.put("bus", busStopDTO);
        trafficMap.put("subway", subwayDTO);
//        resultMap.put("traffic", trafficMap);

        resultMap.put("school", schoolDto);
        resultMap.put("academy", academyDto);
//
        safeMap.put("CCTV", cctvDto);
        safeMap.put("Police", policeDto);

//        resultMap.put("safe", safeMap);


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
//        return new ResponseEntity<>(aptDetailService.dealMethod(id), HttpStatus.OK);
//    }
}
