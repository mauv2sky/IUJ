package com.iuj.backend.api.controller;

import com.iuj.backend.api.domain.entity.LikeBuilding;
import com.iuj.backend.api.domain.enums.ErrorCode;
import com.iuj.backend.api.exception.CustomException;
import com.iuj.backend.api.service.LikeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/like")
public class LikeController {
    @Autowired
    private LikeService likeService;

//    @PostMapping("/")
//    @ApiOperation(value = "관심매물 등록 api", notes = "관심매물 등록 api")
//    public ResponseEntity<Object> getPlaceList(@PathVariable String type, PlaceMainRequest request){
//        try{
////            PlaceMainResponse response = new PlaceMainResponse();
//            List<BuildingDto> placeList = new ArrayList<>();
//
//            return new ResponseEntity<>(placeList, HttpStatus.OK);
//        } catch (Exception e){
//            throw new CustomException(ErrorCode.INVALID_REQUEST);
//        }
//    }
//
//    @DeleteMapping("/")
//    @ApiOperation(value = "관심매물 삭제 api", notes = "관심매물 삭제 api")
//    public ResponseEntity<Object> testApi(@PathVariable Long id){
//        try{
//            return new ResponseEntity<>(aptService.aptMethod(id), HttpStatus.OK);
//        }catch (Exception e){
//            throw new CustomException(ErrorCode.UNKNOWN_ERROR);
//        }
//    }


    @GetMapping("/{email}")
    @ApiOperation(value = "관심매물 조회 api", notes = "관심매물 조회 api")
    public ResponseEntity<List<LikeBuilding>> getAllLikesByEmail(@PathVariable String email) {
        try{
            return new ResponseEntity<>(likeService.getAllLikesByEmail(email), HttpStatus.OK);
        }catch (Exception e){
            throw new CustomException(ErrorCode.UNKNOWN_ERROR);
        }
    }

}