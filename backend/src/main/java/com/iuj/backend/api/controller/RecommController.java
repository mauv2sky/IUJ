package com.iuj.backend.api.controller;

import com.iuj.backend.api.domain.dto.request.DelRecommRequest;
import com.iuj.backend.api.domain.dto.request.RecommRequest;
import com.iuj.backend.api.domain.enums.ErrorCode;
import com.iuj.backend.api.exception.CustomException;
import com.iuj.backend.api.service.RecommService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/recomm")
public class RecommController {
    @Autowired
    private RecommService recommService;

    @PostMapping("")
    @ApiOperation(value = "선호 필터 ", notes = "선호 필터 등록 api")
    public ResponseEntity<Object> addRecomm(@RequestBody RecommRequest request, Principal principal) {
        try {
            recommService.addRecomm(request, principal.getName());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }



    @DeleteMapping("")
    @ApiOperation(value = "선호 필터 삭제 api", notes = "선호 필터 삭제 api")
    public ResponseEntity<Object> delRecomm(@RequestBody DelRecommRequest request, Principal principal) {
        try{
            recommService.delRecomm(request, principal.getName());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }


    @GetMapping("")
    @ApiOperation(value = "선호 필터 조회 api", notes = "선호 필터 조회 api")
    public ResponseEntity<Object> getAllLikesByEmail(Principal principal) {
        try{
            return new ResponseEntity<>(recommService.getAllRecommsByEmail(principal.getName()), HttpStatus.OK);
        }catch (Exception e){
            throw new CustomException(ErrorCode.UNKNOWN_ERROR);
        }
    }
}