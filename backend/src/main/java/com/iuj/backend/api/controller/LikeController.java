package com.iuj.backend.api.controller;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/like")
public class LikeController {
    private final AptService aptService;

    @PostMapping("/")
    @ApiOperation(value = "관심매물 등록 api", notes = "관심매물 등록 api")
    public ResponseEntity<Object> getPlaceList(@PathVariable String type, PlaceMainRequest request){
        try{
//            PlaceMainResponse response = new PlaceMainResponse();
            List<BuildingDto> placeList = new ArrayList<>();

            return new ResponseEntity<>(placeList, HttpStatus.OK);
        } catch (Exception e){
            throw new CustomException(ErrorCode.INVALID_REQUEST);
        }
    }

    @DeleteMapping("/")
    @ApiOperation(value = "관심매물 삭제 api", notes = "관심매물 삭제 api")
    public ResponseEntity<Object> testApi(@PathVariable Long id){
        try{
            return new ResponseEntity<>(aptService.aptMethod(id), HttpStatus.OK);
        }catch (Exception e){
            throw new CustomException(ErrorCode.UNKNOWN_ERROR);
        }
    }


    @GetMapping("/")
    @ApiOperation(value = "관심매물 조회 api", notes = "관심매물 조회 api")
    public ResponseEntity<Object> testApi(@PathVariable Long id){
        try{
            return new ResponseEntity<>(aptService.aptMethod(id), HttpStatus.OK);
        }catch (Exception e){
            throw new CustomException(ErrorCode.UNKNOWN_ERROR);
        }
    }

}
