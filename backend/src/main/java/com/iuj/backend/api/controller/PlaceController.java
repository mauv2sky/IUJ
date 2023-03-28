package com.iuj.backend.api.controller;

import com.iuj.backend.api.domain.dto.request.PlaceMainRequest;
import com.iuj.backend.api.domain.dto.response.BuildingDto;
import com.iuj.backend.api.domain.enums.ErrorCode;
import com.iuj.backend.api.exception.CustomException;
import com.iuj.backend.api.service.AptService;
import com.iuj.backend.api.service.BuildingService;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/place")
public class PlaceController {
    private final AptService aptService;
    private final BuildingService buildingService;

    @PostMapping("")
    @ApiOperation(value = "지도 api", notes = "지도 페이지에서 사용하는 api")
    public ResponseEntity<Object> getPlaceList(
            @RequestBody PlaceMainRequest request){
        try{
            List<BuildingDto> placeList = buildingService.getBuildingList(request);
            return new ResponseEntity<>(placeList, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            throw new CustomException(ErrorCode.INVALID_REQUEST);
        }
    }

//    @GetMapping("/apt/{id}")
//    @ApiOperation(value = "Get Apt By Id", notes = "this is test!")
//    public ResponseEntity<Object> testApi(@PathVariable Long id){
//        try{
//            return new ResponseEntity<>(aptService.aptMethod(id), HttpStatus.OK);
//        }catch (Exception e){
//            throw new CustomException(ErrorCode.UNKNOWN_ERROR);
//        }
//    }

}
