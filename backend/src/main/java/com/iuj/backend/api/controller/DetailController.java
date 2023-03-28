package com.iuj.backend.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iuj.backend.api.domain.dto.response.*;

import com.iuj.backend.api.repository.infra.CinemaRepository;
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
    @Autowired
    private final OfficetelService officetelService;
    @Autowired
    private final VillaService villaService;
    private final TrafficService trafficService;
    private final SchoolService schoolService;
    private final AcademyService academyService;
    private final SafeService safeService;
    private final ConviService conviService;
    private final ConviService HospitalService;
    private final CultureService cultureService;


    @GetMapping("/APT/{id}")
    @ApiOperation(value="아파트 상세페이지 정보", notes="아파트 상세페이지 정보")
    public Map<String, Object> getApart(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        Map<String, Object> trafficMap = new HashMap<>();
        Map<String, Object> safeMap = new HashMap<>();
        Map<String, Object> cultureMap = new HashMap<>();
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

//        편의시설
        List<ConviDto> conviDto = conviService.findNearbyConvi(apartDTO.getLat(), apartDTO.getLng());
        List<HospitalDto> hospitalDto = conviService.findNearbyHospital(apartDTO.getLat(), apartDTO.getLng());

//        문화시설
        List<CinemaDto> cinemaDto = cultureService.findNearbyCinemas(apartDTO.getLat(), apartDTO.getLng());
        List<LibraryDto> libraryDto = cultureService.findNearbyLibrarys(apartDTO.getLat(), apartDTO.getLng());
        List<GalleryDto> galleryDto = cultureService.findNearbyGallerys(apartDTO.getLat(), apartDTO.getLng());
        List<ParkDto> parkDto = cultureService.findNearbyParks(apartDTO.getLat(), apartDTO.getLng());



        resultMap.put("apart", apartDTO);
        resultMap.put("deal", aptDealTypeDTO);
//      교통 추가
        trafficMap.put("bus", busStopDTO);
        trafficMap.put("subway", subwayDTO);
        resultMap.put("traffic", trafficMap);
//      학군 추가
        resultMap.put("school", schoolDto);
        resultMap.put("academy", academyDto);
//      치안 추가
        safeMap.put("CCTV", cctvDto);
        safeMap.put("Police", policeDto);
        resultMap.put("safe", safeMap);
//      편의 시설 추가
        resultMap.put("편의점", conviDto);
        resultMap.put("병원", hospitalDto);


        cultureMap.put("영화관", cinemaDto);
        cultureMap.put("도서관", libraryDto);
        cultureMap.put("곻원", parkDto);
        cultureMap.put("미술관", galleryDto);
        resultMap.put("문화시설", cultureMap);

        return resultMap;
    }

    @GetMapping("/APT/{id}/school")
    @ApiOperation(value="아파트 학군 정보", notes="아파트 학군 정보")
    public Map<String, Object> getAptSchool(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        AptDto apartDTO = aptService.getApartById(id);
//        학군
        List<SchoolTypeDto> schoolDto = schoolService.findNearBySchool(apartDTO.getLat(), apartDTO.getLng());
        List<AcademyTypeDto> academyDto = academyService.findNearByAcademy(apartDTO.getLat(), apartDTO.getLng());

//      학군 추가
        resultMap.put("school", schoolDto);
        resultMap.put("academy", academyDto);

        return resultMap;
    }

    @GetMapping("/APT/{id}/transport")
    @ApiOperation(value="아파트 교통 정보", notes="아파트 교통 정보")
    public Map<String, Object> getAptTransport(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        AptDto apartDTO = aptService.getApartById(id);
//      교통
        List<BusStopDto> busStopDTO = trafficService.findNearbyBusStops(apartDTO.getLat(), apartDTO.getLng());
        List<SubwayDto> subwayDTO = trafficService.findNearbySubways(apartDTO.getLat(), apartDTO.getLng());

//      교통 추가
        resultMap.put("bus", busStopDTO);
        resultMap.put("subway", subwayDTO);

        return resultMap;
    }

    @GetMapping("/APT/{id}/convinient")
    @ApiOperation(value="아파트 편의 정보", notes="아파트 편의 정보")
    public Map<String, Object> getAptConvinient(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        AptDto apartDTO = aptService.getApartById(id);

//        편의시설
        List<ConviDto> conviDto = conviService.findNearbyConvi(apartDTO.getLat(), apartDTO.getLng());
        List<HospitalDto> hospitalDto = conviService.findNearbyHospital(apartDTO.getLat(), apartDTO.getLng());
        List<ShoppingDto> shoppingDto = conviService.findNearbyShopping(apartDTO.getLat(), apartDTO.getLng());


//      편의 시설 추가
        resultMap.put("편의점", conviDto);
        resultMap.put("병원", hospitalDto);
        resultMap.put("대형점포", shoppingDto);
        return resultMap;
    }

    @GetMapping("/APT/{id}/safe")
    @ApiOperation(value="아파트 치안 정보", notes="아파트 치안 정보")
    public Map<String, Object> getAptSafe(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        AptDto apartDTO = aptService.getApartById(id);

//       치안
        List<CctvDto> cctvDto = safeService.findNearbyCctvs(apartDTO.getLat(), apartDTO.getLng());
        List<PoliceDto> policeDto = safeService.findNearbyPolices(apartDTO.getLat(), apartDTO.getLng());
//      치안 추가
        resultMap.put("CCTV", cctvDto);
        resultMap.put("Police", policeDto);

        return resultMap;
    }

    @GetMapping("/APT/{id}/culture")
    @ApiOperation(value="아파트 문화 정보", notes="아파트 문화 정보")
    public Map<String, Object> getAptCulture(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        AptDto apartDTO = aptService.getApartById(id);

//        문화시설
        List<CinemaDto> cinemaDto = cultureService.findNearbyCinemas(apartDTO.getLat(), apartDTO.getLng());
        List<LibraryDto> libraryDto = cultureService.findNearbyLibrarys(apartDTO.getLat(), apartDTO.getLng());
        List<GalleryDto> galleryDto = cultureService.findNearbyGallerys(apartDTO.getLat(), apartDTO.getLng());
        List<ParkDto> parkDto = cultureService.findNearbyParks(apartDTO.getLat(), apartDTO.getLng());

        resultMap.put("영화관", cinemaDto);
        resultMap.put("도서관", libraryDto);
        resultMap.put("곻원", parkDto);
        resultMap.put("미술관", galleryDto);
        return resultMap;
    }

//    -------------------------------------------------------------------------------------
//    오피스텔
    @GetMapping("/OFFICETEL/{id}")
    @ApiOperation(value="오피스텔 상세페이지 정보", notes="오피스텔 상세페이지 정보")
    public Map<String, Object> getOfficetel(@PathVariable Long id){
    Map<String, Object> resultMap = new HashMap<>();
    Map<String, Object> trafficMap = new HashMap<>();
    Map<String, Object> safeMap = new HashMap<>();
    Map<String, Object> cultureMap = new HashMap<>();
    OfficetelDto officetelDTO = officetelService.getOfficetelById(id);
    List<OfficetelDealTypeDto> officetelDealTypeDTO = officetelService.getDealByOfficetelId(id);

//      교통
    List<BusStopDto> busStopDTO = trafficService.findNearbyBusStops(officetelDTO.getLat(), officetelDTO.getLng());
    List<SubwayDto> subwayDTO = trafficService.findNearbySubways(officetelDTO.getLat(), officetelDTO.getLng());

//        학군
    List<SchoolTypeDto> schoolDto = schoolService.findNearBySchool(officetelDTO.getLat(), officetelDTO.getLng());
    List<AcademyTypeDto> academyDto = academyService.findNearByAcademy(officetelDTO.getLat(), officetelDTO.getLng());
//       치안
    List<CctvDto> cctvDto = safeService.findNearbyCctvs(officetelDTO.getLat(), officetelDTO.getLng());
    List<PoliceDto> policeDto = safeService.findNearbyPolices(officetelDTO.getLat(), officetelDTO.getLng());

//        편의시설
    List<ConviDto> conviDto = conviService.findNearbyConvi(officetelDTO.getLat(), officetelDTO.getLng());
    List<HospitalDto> hospitalDto = conviService.findNearbyHospital(officetelDTO.getLat(), officetelDTO.getLng());

//        문화시설
    List<CinemaDto> cinemaDto = cultureService.findNearbyCinemas(officetelDTO.getLat(), officetelDTO.getLng());
    List<LibraryDto> libraryDto = cultureService.findNearbyLibrarys(officetelDTO.getLat(), officetelDTO.getLng());
    List<GalleryDto> galleryDto = cultureService.findNearbyGallerys(officetelDTO.getLat(), officetelDTO.getLng());
    List<ParkDto> parkDto = cultureService.findNearbyParks(officetelDTO.getLat(), officetelDTO.getLng());



    resultMap.put("apart", officetelDTO);
    resultMap.put("deal", officetelDealTypeDTO);
//      교통 추가
    trafficMap.put("bus", busStopDTO);
    trafficMap.put("subway", subwayDTO);
    resultMap.put("traffic", trafficMap);
//      학군 추가
    resultMap.put("school", schoolDto);
    resultMap.put("academy", academyDto);
//      치안 추가
    safeMap.put("CCTV", cctvDto);
    safeMap.put("Police", policeDto);
    resultMap.put("safe", safeMap);
//      편의 시설 추가
    resultMap.put("편의점", conviDto);
    resultMap.put("병원", hospitalDto);


    cultureMap.put("영화관", cinemaDto);
    cultureMap.put("도서관", libraryDto);
    cultureMap.put("곻원", parkDto);
    cultureMap.put("미술관", galleryDto);
    resultMap.put("문화시설", cultureMap);

    return resultMap;
}

    @GetMapping("/OFFICETEL/{id}/school")
    @ApiOperation(value="오피스텔 학군 정보", notes="오피스텔 학군 정보")
    public Map<String, Object> getOfficetelSchool(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        OfficetelDto officetelDTO = officetelService.getOfficetelById(id);
//        학군
        List<SchoolTypeDto> schoolDto = schoolService.findNearBySchool(officetelDTO.getLat(), officetelDTO.getLng());
        List<AcademyTypeDto> academyDto = academyService.findNearByAcademy(officetelDTO.getLat(), officetelDTO.getLng());

//      학군 추가
        resultMap.put("school", schoolDto);
        resultMap.put("academy", academyDto);

        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/transport")
    @ApiOperation(value="오피스텔 교통 정보", notes="오피스텔 교통 정보")
    public Map<String, Object> getOfficetelTransport(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        OfficetelDto officetelDto = officetelService.getOfficetelById(id);
//      교통
        List<BusStopDto> busStopDTO = trafficService.findNearbyBusStops(officetelDto.getLat(), officetelDto.getLng());
        List<SubwayDto> subwayDTO = trafficService.findNearbySubways(officetelDto.getLat(), officetelDto.getLng());

//      교통 추가
        resultMap.put("bus", busStopDTO);
        resultMap.put("subway", subwayDTO);

        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/convinient")
    @ApiOperation(value="오피스텔 편의 정보", notes="오피스텔 편의 정보")
    public Map<String, Object> getOfficetelConvinient(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        OfficetelDto officetelDto = officetelService.getOfficetelById(id);

//        편의시설
        List<ConviDto> conviDto = conviService.findNearbyConvi(officetelDto.getLat(), officetelDto.getLng());
        List<HospitalDto> hospitalDto = conviService.findNearbyHospital(officetelDto.getLat(), officetelDto.getLng());
        List<ShoppingDto> shoppingDto = conviService.findNearbyShopping(officetelDto.getLat(), officetelDto.getLng());


//      편의 시설 추가
        resultMap.put("편의점", conviDto);
        resultMap.put("병원", hospitalDto);
        resultMap.put("대형점포", shoppingDto);
        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/safe")
    @ApiOperation(value="오피스텔 치안 정보", notes="오피스텔 치안 정보")
    public Map<String, Object> getOfficetelSafe(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        OfficetelDto officetelDto = officetelService.getOfficetelById(id);

//       치안
        List<CctvDto> cctvDto = safeService.findNearbyCctvs(officetelDto.getLat(), officetelDto.getLng());
        List<PoliceDto> policeDto = safeService.findNearbyPolices(officetelDto.getLat(), officetelDto.getLng());
//      치안 추가
        resultMap.put("CCTV", cctvDto);
        resultMap.put("Police", policeDto);

        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/culture")
    @ApiOperation(value="오피스텔 문화 정보", notes="오피스텔 문화 정보")
    public Map<String, Object> getOfficetelCulture(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        OfficetelDto officetelDto = officetelService.getOfficetelById(id);

//        문화시설
        List<CinemaDto> cinemaDto = cultureService.findNearbyCinemas(officetelDto.getLat(), officetelDto.getLng());
        List<LibraryDto> libraryDto = cultureService.findNearbyLibrarys(officetelDto.getLat(), officetelDto.getLng());
        List<GalleryDto> galleryDto = cultureService.findNearbyGallerys(officetelDto.getLat(), officetelDto.getLng());
        List<ParkDto> parkDto = cultureService.findNearbyParks(officetelDto.getLat(), officetelDto.getLng());

        resultMap.put("영화관", cinemaDto);
        resultMap.put("도서관", libraryDto);
        resultMap.put("곻원", parkDto);
        resultMap.put("미술관", galleryDto);
        return resultMap;
    }

//    ---------------------------------------------------------------------------------------------------
//    빌라
    @GetMapping("/VILLA/{id}")
    @ApiOperation(value="빌라 상세페이지 정보", notes="빌라 상세페이지 정보")
    public Map<String, Object> getVillatel(@PathVariable Long id){
    Map<String, Object> resultMap = new HashMap<>();
    Map<String, Object> trafficMap = new HashMap<>();
    Map<String, Object> safeMap = new HashMap<>();
    Map<String, Object> cultureMap = new HashMap<>();
    VillaDto villaDto = villaService.getVillaById(id);
    List<VillaDealTypeDto> villaDealTypeDTO = villaService.getDealByVillaId(id);

//      교통
    List<BusStopDto> busStopDTO = trafficService.findNearbyBusStops(villaDto.getLat(), villaDto.getLng());
    List<SubwayDto> subwayDTO = trafficService.findNearbySubways(villaDto.getLat(), villaDto.getLng());

//        학군
    List<SchoolTypeDto> schoolDto = schoolService.findNearBySchool(villaDto.getLat(), villaDto.getLng());
    List<AcademyTypeDto> academyDto = academyService.findNearByAcademy(villaDto.getLat(), villaDto.getLng());

//       치안
    List<CctvDto> cctvDto = safeService.findNearbyCctvs(villaDto.getLat(), villaDto.getLng());
    List<PoliceDto> policeDto = safeService.findNearbyPolices(villaDto.getLat(), villaDto.getLng());

//        편의시설
    List<ConviDto> conviDto = conviService.findNearbyConvi(villaDto.getLat(), villaDto.getLng());
    List<HospitalDto> hospitalDto = conviService.findNearbyHospital(villaDto.getLat(), villaDto.getLng());

//        문화시설
    List<CinemaDto> cinemaDto = cultureService.findNearbyCinemas(villaDto.getLat(), villaDto.getLng());
    List<LibraryDto> libraryDto = cultureService.findNearbyLibrarys(villaDto.getLat(), villaDto.getLng());
    List<GalleryDto> galleryDto = cultureService.findNearbyGallerys(villaDto.getLat(), villaDto.getLng());
    List<ParkDto> parkDto = cultureService.findNearbyParks(villaDto.getLat(), villaDto.getLng());



    resultMap.put("villa", villaDto);
    resultMap.put("deal", villaDealTypeDTO);
//      교통 추가
    trafficMap.put("bus", busStopDTO);
    trafficMap.put("subway", subwayDTO);
    resultMap.put("traffic", trafficMap);
//      학군 추가
    resultMap.put("school", schoolDto);
    resultMap.put("academy", academyDto);
//      치안 추가
    safeMap.put("CCTV", cctvDto);
    safeMap.put("Police", policeDto);
    resultMap.put("safe", safeMap);
//      편의 시설 추가
    resultMap.put("편의점", conviDto);
    resultMap.put("병원", hospitalDto);


    cultureMap.put("영화관", cinemaDto);
    cultureMap.put("도서관", libraryDto);
    cultureMap.put("곻원", parkDto);
    cultureMap.put("미술관", galleryDto);
    resultMap.put("문화시설", cultureMap);

        System.out.println(resultMap);
    return resultMap;
}

    @GetMapping("/VILLA/{id}/school")
    @ApiOperation(value="빌라 학군 정보", notes="빌라 학군 정보")
    public Map<String, Object> getVillaSchool(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        VillaDto villaDTO = villaService.getVillaById(id);
//        학군
        List<SchoolTypeDto> schoolDto = schoolService.findNearBySchool(villaDTO.getLat(), villaDTO.getLng());
        List<AcademyTypeDto> academyDto = academyService.findNearByAcademy(villaDTO.getLat(), villaDTO.getLng());

//      학군 추가
        resultMap.put("school", schoolDto);
        resultMap.put("academy", academyDto);

        return resultMap;
    }

    @GetMapping("/VILLA/{id}/transport")
    @ApiOperation(value="빌라 교통 정보", notes="빌라 교통 정보")
    public Map<String, Object> getVillaTransport(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        VillaDto villaDto = villaService.getVillaById(id);
//      교통
        List<BusStopDto> busStopDTO = trafficService.findNearbyBusStops(villaDto.getLat(), villaDto.getLng());
        List<SubwayDto> subwayDTO = trafficService.findNearbySubways(villaDto.getLat(), villaDto.getLng());

//      교통 추가
        resultMap.put("bus", busStopDTO);
        resultMap.put("subway", subwayDTO);

        return resultMap;
    }

    @GetMapping("/VILLA/{id}/convinient")
    @ApiOperation(value="빌라 편의 정보", notes="빌라 편의 정보")
    public Map<String, Object> getVillaConvinient(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        VillaDto villaDto = villaService.getVillaById(id);

//        편의시설
        List<ConviDto> conviDto = conviService.findNearbyConvi(villaDto.getLat(), villaDto.getLng());
        List<HospitalDto> hospitalDto = conviService.findNearbyHospital(villaDto.getLat(), villaDto.getLng());
        List<ShoppingDto> shoppingDto = conviService.findNearbyShopping(villaDto.getLat(), villaDto.getLng());


//      편의 시설 추가
        resultMap.put("편의점", conviDto);
        resultMap.put("병원", hospitalDto);
        resultMap.put("대형점포", shoppingDto);
        return resultMap;
    }

    @GetMapping("/VILLA/{id}/safe")
    @ApiOperation(value="빌라 치안 정보", notes="빌라 치안 정보")
    public Map<String, Object> getVillaSafe(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        VillaDto villaDto = villaService.getVillaById(id);

//       치안
        List<CctvDto> cctvDto = safeService.findNearbyCctvs(villaDto.getLat(), villaDto.getLng());
        List<PoliceDto> policeDto = safeService.findNearbyPolices(villaDto.getLat(), villaDto.getLng());
//      치안 추가
        resultMap.put("CCTV", cctvDto);
        resultMap.put("Police", policeDto);

        return resultMap;
    }

    @GetMapping("/VILLA/{id}/culture")
    @ApiOperation(value="빌라 문화 정보", notes="빌라 문화 정보")
    public Map<String, Object> getVillaCulture(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        VillaDto villaDto = villaService.getVillaById(id);

//        문화시설
        List<CinemaDto> cinemaDto = cultureService.findNearbyCinemas(villaDto.getLat(), villaDto.getLng());
        List<LibraryDto> libraryDto = cultureService.findNearbyLibrarys(villaDto.getLat(), villaDto.getLng());
        List<GalleryDto> galleryDto = cultureService.findNearbyGallerys(villaDto.getLat(), villaDto.getLng());
        List<ParkDto> parkDto = cultureService.findNearbyParks(villaDto.getLat(), villaDto.getLng());

        resultMap.put("영화관", cinemaDto);
        resultMap.put("도서관", libraryDto);
        resultMap.put("곻원", parkDto);
        resultMap.put("미술관", galleryDto);
        return resultMap;
    }






}
