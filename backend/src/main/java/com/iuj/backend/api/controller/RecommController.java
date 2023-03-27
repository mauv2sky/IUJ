package com.iuj.backend.api.controller;

import com.iuj.backend.api.domain.enums.ErrorCode;
import com.iuj.backend.api.exception.CustomException;
import com.iuj.backend.api.service.RecommService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/recomm")
public class RecommController {
    @Autowired
    private RecommService recommService;

//    @PostMapping("")
//    @ApiOperation(value = "선호 필터 ", notes = "관심매물 등록 api")
//    public ResponseEntity<Object> addLike(@RequestBody LikeBuildingRequest request, @RequestHeader("X-Auth-Token") String authToken) {
//        try {
//            this.recommService.addRecomm(request, authToken);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
//        }
//    }
//
//
//
//    @DeleteMapping("")
//    @ApiOperation(value = "관심매물 삭제 api", notes = "관심매물 삭제 api")
//    public ResponseEntity<Object> delLike(@RequestBody LikeBuildingRequest request,
//                                          @RequestHeader(value="X-Auth-Token") String authToken) {
//        try{
//            likeService.delLike(request, authToken);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
//        }
//    }


    @GetMapping("")
    @ApiOperation(value = "관심매물 조회 api", notes = "관심매물 조회 api")
    public ResponseEntity<Object> getAllLikesByEmail(@RequestHeader(value="X-Auth-Token") String authToken) {
        try{
            return new ResponseEntity<>(recommService.getAllRecommsByEmail(authToken), HttpStatus.OK);
        }catch (Exception e){
            throw new CustomException(ErrorCode.UNKNOWN_ERROR);
        }
    }
}