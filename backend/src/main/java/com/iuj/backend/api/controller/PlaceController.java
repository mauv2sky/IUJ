package com.iuj.backend.api.controller;

import com.iuj.backend.api.domain.dto.request.MapRequest;
import com.iuj.backend.api.domain.enums.ErrorCode;
import com.iuj.backend.api.exception.CustomException;
import com.iuj.backend.api.service.AptService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/place")
public class PlaceController {
    private final AptService aptService;

    @PostMapping("/{type}")
    @ApiOperation(value = "지도 api", notes = "지도 페이지에서 사용하는 api")
    public ResponseEntity<Object> getPlaceList(@PathVariable String type, MapRequest request){
        try{
            return new ResponseEntity<>(aptService.aptMethod(1L), HttpStatus.OK);
        } catch (Exception e){
            throw new CustomException(ErrorCode.INVALID_REQUEST);
        }
    }

    @GetMapping("/apt/{id}")
    @ApiOperation(value = "Get Apt By Id", notes = "this is test!")
    public ResponseEntity<Object> testApi(@PathVariable Long id){
        try{
            return new ResponseEntity<>(aptService.aptMethod(id), HttpStatus.OK);
        }catch (Exception e){
            throw new CustomException(ErrorCode.UNKNOWN_ERROR);
        }
    }

}
