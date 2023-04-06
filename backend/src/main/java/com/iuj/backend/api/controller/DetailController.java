package com.iuj.backend.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iuj.backend.api.domain.dto.response.*;

import com.iuj.backend.api.domain.entity.building.AptDeal;
import com.iuj.backend.api.repository.building.AptDealRepository;
import com.iuj.backend.api.repository.infra.CinemaRepository;
import com.iuj.backend.api.service.*;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

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
    private final CultureService cultureService;

    private final AptDealRepository aptDealRepository;

    @GetMapping("/APT/{id}")
    @ApiOperation(value = "아파트 상세페이지 정보", notes = "아파트 상세페이지 정보")
    public Map<String, Object> getApart(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        AptDto apartDTO = aptService.getApartById(id);
        List<AptDealTypeDto> aptDealTypeDTO = aptService.getDealByApartId(id);

        resultMap.put("home", apartDTO);
        int maxPrice = aptDealTypeDTO.stream().mapToInt(AptDealTypeDto::getMaxPrice).max().orElse(0);
        int minPrice = aptDealTypeDTO.stream().mapToInt(AptDealTypeDto::getMinPrice).min().orElse(0);

        Map<String, Object> dealInfo = new HashMap<>();
        dealInfo.put("maxPrice", maxPrice);
        dealInfo.put("minPrice", minPrice);
//        resultMap.put("dealPrice", dealInfo);
        resultMap.put("Deal", aptDealTypeDTO);
        return resultMap;
    }

    @GetMapping("/APT/{id}/school")
    @ApiOperation(value = "아파트 학군 정보", notes = "아파트 학군 정보")
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

    @GetMapping("/APT/{id}/bus")
    @ApiOperation(value = "아파트 버스 정보", notes = "아파트 버스 정보")
    public Map<String, Object> getAptBus(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        AptDto apartDTO = aptService.getApartById(id);
//      교통
        List<BusStopDto> busStopDTO = trafficService.findNearbyBusStops(apartDTO.getLat(), apartDTO.getLng());

//      교통 추가
        resultMap.put("bus", busStopDTO);

        return resultMap;
    }

    @GetMapping("/APT/{id}/subway")
    @ApiOperation(value = "아파트 지하철 정보", notes = "아파트 지하철 정보")
    public Map<String, Object> getAptTransport(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        AptDto apartDTO = aptService.getApartById(id);
//      교통
        List<SubwayDto> subwayDTO = trafficService.findNearbySubways(apartDTO.getLat(), apartDTO.getLng());

//      교통 추가
        resultMap.put("subway", subwayDTO);

        return resultMap;
    }

    @GetMapping("/APT/{id}/convi")
    @ApiOperation(value = "아파트 편의점 정보", notes = "아파트 편의점 정보")
    public Map<String, Object> getAptConvi(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        AptDto apartDTO = aptService.getApartById(id);

//        편의시설
        List<ConviDto> conviDto = conviService.findNearbyConvi(apartDTO.getLat(), apartDTO.getLng());

//      편의 시설 추가
        resultMap.put("convi", conviDto);
        return resultMap;
    }

    @GetMapping("/APT/{id}/hospital")
    @ApiOperation(value = "아파트 병원 정보", notes = "아파트 병원 정보")
    public Map<String, Object> getAptHospital(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        AptDto apartDTO = aptService.getApartById(id);

//        편의시설
        List<HospitalDto> hospitalDto = conviService.findNearbyHospital(apartDTO.getLat(), apartDTO.getLng());

//      편의 시설 추가
        resultMap.put("hospital", hospitalDto);
        return resultMap;
    }

    @GetMapping("/APT/{id}/shopping")
    @ApiOperation(value = "아파트 대형매장 정보", notes = "아파트 대형매장 정보")
    public Map<String, Object> getAptShopping(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        AptDto apartDTO = aptService.getApartById(id);

//        편의시설
        List<ShoppingDto> shoppingDto = conviService.findNearbyShopping(apartDTO.getLat(), apartDTO.getLng());

//      편의 시설 추가
        resultMap.put("shopping", shoppingDto);
        return resultMap;
    }

    @GetMapping("/APT/{id}/cctv")
    @ApiOperation(value = "아파트 cctv 정보", notes = "아파트 cctv 정보")
    public Map<String, Object> getAptCctv(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        AptDto apartDTO = aptService.getApartById(id);

//       치안
        List<CctvDto> cctvDto = safeService.findNearbyCctvs(apartDTO.getLat(), apartDTO.getLng());
//      치안 추가
        resultMap.put("cctv", cctvDto);

        return resultMap;
    }

    @GetMapping("/APT/{id}/police")
    @ApiOperation(value = "아파트 경찰서 정보", notes = "아파트 경찰서 정보")
    public Map<String, Object> getAptPolice(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        AptDto apartDTO = aptService.getApartById(id);

//       치안
        List<PoliceDto> policeDto = safeService.findNearbyPolices(apartDTO.getLat(), apartDTO.getLng());
//      치안 추가
        resultMap.put("police", policeDto);

        return resultMap;
    }

    @GetMapping("/APT/{id}/cinema")
    @ApiOperation(value = "아파트 영화관 정보", notes = "아파트 영화관 정보")
    public Map<String, Object> getAptCinema(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        AptDto apartDTO = aptService.getApartById(id);

//        문화시설
        List<CinemaDto> cinemaDto = cultureService.findNearbyCinemas(apartDTO.getLat(), apartDTO.getLng());

        resultMap.put("cinema", cinemaDto);
        return resultMap;
    }

    @GetMapping("/APT/{id}/lib")
    @ApiOperation(value = "아파트 도서관 정보", notes = "아파트 도서관 정보")
    public Map<String, Object> getAptLibrary(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        AptDto apartDTO = aptService.getApartById(id);

//        문화시설
        List<LibraryDto> libraryDto = cultureService.findNearbyLibrarys(apartDTO.getLat(), apartDTO.getLng());

        resultMap.put("lib", libraryDto);
        return resultMap;
    }

    @GetMapping("/APT/{id}/gallery")
    @ApiOperation(value = "아파트 미술관 정보", notes = "아파트 미술관 정보")
    public Map<String, Object> getAptGallery(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        AptDto apartDTO = aptService.getApartById(id);

//        문화시설
        List<GalleryDto> galleryDto = cultureService.findNearbyGallerys(apartDTO.getLat(), apartDTO.getLng());

        resultMap.put("gallery", galleryDto);
        return resultMap;
    }

    @GetMapping("/APT/{id}/park")
    @ApiOperation(value = "아파트 공원 정보", notes = "아파트 공원 정보")
    public Map<String, Object> getAptPark(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        AptDto apartDTO = aptService.getApartById(id);

//        문화시설
        List<ParkDto> parkDto = cultureService.findNearbyParks(apartDTO.getLat(), apartDTO.getLng());

        resultMap.put("park", parkDto);
        return resultMap;
    }

    //    -------------------------------------------------------------------------------------
//    오피스텔
    @GetMapping("/OFFICETEL/{id}")
    @ApiOperation(value = "오피스텔 상세페이지 정보", notes = "오피스텔 상세페이지 정보")
    public Map<String, Object> getOfficetel(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        OfficetelDto officetelDto = officetelService.getOfficetelById(id);
        List<OfficetelDealTypeDto> officetelDealTypeDTO = officetelService.getDealByOfficetelId(id);

        resultMap.put("home", officetelDto);
        int maxPrice = officetelDealTypeDTO.stream().mapToInt(OfficetelDealTypeDto::getMaxPrice).max().orElse(0);
        int minPrice = officetelDealTypeDTO.stream().mapToInt(OfficetelDealTypeDto::getMinPrice).min().orElse(0);

        Map<String, Object> dealInfo = new HashMap<>();
        dealInfo.put("maxPrice", maxPrice);
        dealInfo.put("minPrice", minPrice);
//        resultMap.put("dealPrice", dealInfo);
        resultMap.put("Deal", officetelDealTypeDTO);
        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/school")
    @ApiOperation(value = "오피스텔 학군 정보", notes = "오피스텔 학군 정보")
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

    @GetMapping("/OFFICETEL/{id}/bus")
    @ApiOperation(value = "오피스텔 버스 정보", notes = "오피스텔 버스 정보")
    public Map<String, Object> getOfficetelBus(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        OfficetelDto officetelDto = officetelService.getOfficetelById(id);
//      교통
        List<BusStopDto> busStopDTO = trafficService.findNearbyBusStops(officetelDto.getLat(), officetelDto.getLng());

//      교통 추가
        resultMap.put("bus", busStopDTO);

        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/subway")
    @ApiOperation(value = "오피스텔 지하철 정보", notes = "오피스텔 지하철 정보")
    public Map<String, Object> getOfficetelSubway(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        OfficetelDto officetelDto = officetelService.getOfficetelById(id);
//      교통
        List<SubwayDto> subwayDTO = trafficService.findNearbySubways(officetelDto.getLat(), officetelDto.getLng());

//      교통 추가
        resultMap.put("subway", subwayDTO);

        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/convi")
    @ApiOperation(value = "오피스텔 편의점 정보", notes = "오피스텔 편의점 정보")
    public Map<String, Object> getOfficetelConvi(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        OfficetelDto officetelDto = officetelService.getOfficetelById(id);
//        편의시설
        List<ConviDto> conviDto = conviService.findNearbyConvi(officetelDto.getLat(), officetelDto.getLng());

//      편의 시설 추가
        resultMap.put("convi", conviDto);
        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/hospital")
    @ApiOperation(value = "오피스텔 병원 정보", notes = "오피스텔 병원 정보")
    public Map<String, Object> getOfficetelHospital(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        OfficetelDto officetelDto = officetelService.getOfficetelById(id);

//        편의시설
        List<HospitalDto> hospitalDto = conviService.findNearbyHospital(officetelDto.getLat(), officetelDto.getLng());
//      편의 시설 추가
        resultMap.put("hospital", hospitalDto);
        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/shopping")
    @ApiOperation(value = "오피스텔 대형점포 정보", notes = "오피스텔 대형점포 정보")
    public Map<String, Object> getOfficetelShopping(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        OfficetelDto officetelDto = officetelService.getOfficetelById(id);
//        편의시설
        List<ShoppingDto> shoppingDto = conviService.findNearbyShopping(officetelDto.getLat(), officetelDto.getLng());
//      편의 시설 추가
        resultMap.put("shopping", shoppingDto);
        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/cctv")
    @ApiOperation(value = "오피스텔 cctv 정보", notes = "오피스텔 cctv 정보")
    public Map<String, Object> getOfficetelCctv(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        OfficetelDto officetelDto = officetelService.getOfficetelById(id);
//       치안
        List<CctvDto> cctvDto = safeService.findNearbyCctvs(officetelDto.getLat(), officetelDto.getLng());
        resultMap.put("cctv", cctvDto);

        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/police")
    @ApiOperation(value = "오피스텔 경찰서 정보", notes = "오피스텔 경찰서 정보")
    public Map<String, Object> getOfficetelPolice(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        OfficetelDto officetelDto = officetelService.getOfficetelById(id);

//       치안
        List<PoliceDto> policeDto = safeService.findNearbyPolices(officetelDto.getLat(), officetelDto.getLng());
//      치안 추가
        resultMap.put("police", policeDto);

        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/cinema")
    @ApiOperation(value = "오피스텔 영화관 정보", notes = "오피스텔 영화관 정보")
    public Map<String, Object> getOfficetelCinemare(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        OfficetelDto officetelDto = officetelService.getOfficetelById(id);

//        문화시설
        List<CinemaDto> cinemaDto = cultureService.findNearbyCinemas(officetelDto.getLat(), officetelDto.getLng());
        resultMap.put("cinema", cinemaDto);
        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/lib")
    @ApiOperation(value = "오피스텔 도서관 정보", notes = "오피스텔 도서관 정보")
    public Map<String, Object> getOfficetelLib(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        OfficetelDto officetelDto = officetelService.getOfficetelById(id);

//        문화시설
        List<LibraryDto> libraryDto = cultureService.findNearbyLibrarys(officetelDto.getLat(), officetelDto.getLng());

        resultMap.put("lib", libraryDto);
        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/gallery")
    @ApiOperation(value = "오피스텔 미술관 정보", notes = "오피스텔 미술관 정보")
    public Map<String, Object> getOfficetelGallery(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        OfficetelDto officetelDto = officetelService.getOfficetelById(id);

//        문화시설
        List<GalleryDto> galleryDto = cultureService.findNearbyGallerys(officetelDto.getLat(), officetelDto.getLng());

        resultMap.put("gallery", galleryDto);
        return resultMap;
    }

    @GetMapping("/OFFICETEL/{id}/park")
    @ApiOperation(value = "오피스텔 공원 정보", notes = "오피스텔 공원 정보")
    public Map<String, Object> getOfficetelPark(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        OfficetelDto officetelDto = officetelService.getOfficetelById(id);

//        문화시설
        List<ParkDto> parkDto = cultureService.findNearbyParks(officetelDto.getLat(), officetelDto.getLng());

        resultMap.put("park", parkDto);
        return resultMap;
    }

    //    ---------------------------------------------------------------------------------------------------
//    빌라
    @GetMapping("/VILLA/{id}")
    @ApiOperation(value = "빌라 상세페이지 정보", notes = "빌라 상세페이지 정보")
    public Map<String, Object> getVilla(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        VillaDto villaDto = villaService.getVillaById(id);
        List<VillaDealTypeDto> villaDealTypeDTO = villaService.getDealByVillaId(id);

        resultMap.put("home", villaDto);
        int maxPrice = villaDealTypeDTO.stream().mapToInt(VillaDealTypeDto::getMaxPrice).max().orElse(0);
        int minPrice = villaDealTypeDTO.stream().mapToInt(VillaDealTypeDto::getMinPrice).max().orElse(0);

        Map<String, Object> dealInfo = new HashMap<>();
        dealInfo.put("maxPrice", maxPrice);
        dealInfo.put("minPrice", minPrice);
//        resultMap.put("dealPrice", dealInfo);
        resultMap.put("Deal", villaDealTypeDTO);
        return resultMap;
    }

    @GetMapping("/VILLA/{id}/school")
    @ApiOperation(value = "빌라 학군 정보", notes = "빌라 학군 정보")
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

    @GetMapping("/VILLA/{id}/bus")
    @ApiOperation(value = "빌라 버스 정보", notes = "빌라 버스 정보")
    public Map<String, Object> getVillaBus(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        VillaDto villaDto = villaService.getVillaById(id);
//      교통
        List<BusStopDto> busStopDTO = trafficService.findNearbyBusStops(villaDto.getLat(), villaDto.getLng());
//      교통 추가
        resultMap.put("bus", busStopDTO);
        return resultMap;
    }

    @GetMapping("/VILLA/{id}/subway")
    @ApiOperation(value = "빌라 지하철 정보", notes = "빌라 지하철 정보")
    public Map<String, Object> getVillaSubway(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        VillaDto villaDto = villaService.getVillaById(id);
//      교통
        List<SubwayDto> subwayDTO = trafficService.findNearbySubways(villaDto.getLat(), villaDto.getLng());
        resultMap.put("subway", subwayDTO);

        resultMap.put("subway", subwayDTO);
        return resultMap;
    }


    @GetMapping("/VILLA/{id}/convi")
    @ApiOperation(value = "빌라 편의점 정보", notes = "빌라 편의점 정보")
    public Map<String, Object> getVillaConvi(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        VillaDto villaDto = villaService.getVillaById(id);

//        편의시설
        List<ConviDto> conviDto = conviService.findNearbyConvi(villaDto.getLat(), villaDto.getLng());
//      편의 시설 추가
        resultMap.put("convi", conviDto);
        return resultMap;
    }

    @GetMapping("/VILLA/{id}/hospital")
    @ApiOperation(value = "빌라 병원 정보", notes = "빌라 병원 정보")
    public Map<String, Object> getVillaHospital(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        VillaDto villaDto = villaService.getVillaById(id);
//        편의시설
        List<HospitalDto> hospitalDto = conviService.findNearbyHospital(villaDto.getLat(), villaDto.getLng());

        resultMap.put("hospital", hospitalDto);
        return resultMap;
    }

    @GetMapping("/VILLA/{id}/shopping")
    @ApiOperation(value = "빌라 대형매장 정보", notes = "빌라 대형매장 정보")
    public Map<String, Object> getVillaShopping(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        VillaDto villaDto = villaService.getVillaById(id);

//        편의시설
        List<ShoppingDto> shoppingDto = conviService.findNearbyShopping(villaDto.getLat(), villaDto.getLng());
//      편의 시설 추가
        resultMap.put("shopping", shoppingDto);
        return resultMap;
    }

    @GetMapping("/VILLA/{id}/cctv")
    @ApiOperation(value = "빌라 cctv 정보", notes = "빌라 cctv 정보")
    public Map<String, Object> getVillaCctv(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        VillaDto villaDto = villaService.getVillaById(id);
//       치안
        List<CctvDto> cctvDto = safeService.findNearbyCctvs(villaDto.getLat(), villaDto.getLng());
        resultMap.put("cctv", cctvDto);

        return resultMap;
    }

    @GetMapping("/VILLA/{id}/police")
    @ApiOperation(value = "빌라 경찰서 정보", notes = "빌라 경찰서 정보")
    public Map<String, Object> getVillaPolice(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();

        VillaDto villaDto = villaService.getVillaById(id);

//       치안
        List<PoliceDto> policeDto = safeService.findNearbyPolices(villaDto.getLat(), villaDto.getLng());
//      치안 추가
        resultMap.put("police", policeDto);

        return resultMap;
    }

    @GetMapping("/VILLA/{id}/cinema")
    @ApiOperation(value = "빌라 영화관 정보", notes = "빌라 영화관 정보")
    public Map<String, Object> getVillaCinema(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        VillaDto villaDto = villaService.getVillaById(id);

//        문화시설
        List<CinemaDto> cinemaDto = cultureService.findNearbyCinemas(villaDto.getLat(), villaDto.getLng());

        resultMap.put("cinema", cinemaDto);
        return resultMap;
    }

    @GetMapping("/VILLA/{id}/lib")
    @ApiOperation(value = "빌라 도서관 정보", notes = "빌라 도서관 정보")
    public Map<String, Object> getVillaLib(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        VillaDto villaDto = villaService.getVillaById(id);

//        문화시설
        List<LibraryDto> libraryDto = cultureService.findNearbyLibrarys(villaDto.getLat(), villaDto.getLng());

        resultMap.put("lib", libraryDto);
        return resultMap;
    }
 
    @GetMapping("/VILLA/{id}/gallery")
    @ApiOperation(value = "빌라 미술관 정보", notes = "빌라 미술관 정보")
    public Map<String, Object> getVillaGallery(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        VillaDto villaDto = villaService.getVillaById(id);

//        문화시설
        List<GalleryDto> galleryDto = cultureService.findNearbyGallerys(villaDto.getLat(), villaDto.getLng());

        resultMap.put("gallery", galleryDto);
        return resultMap;
    }

    @GetMapping("/VILLA/{id}/park")
    @ApiOperation(value = "빌라 공원 정보", notes = "빌라 공원 정보")
    public Map<String, Object> getVillaPark(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        VillaDto villaDto = villaService.getVillaById(id);

//        문화시설
        List<ParkDto> parkDto = cultureService.findNearbyParks(villaDto.getLat(), villaDto.getLng());

        resultMap.put("park", parkDto);
        return resultMap;
    }

//    @GetMapping("/APT/chart/{id}")
//    public ResponseEntity<Map<String, Object>> getAptDealChart(@PathVariable Long id) {
//        List<AptDealTypeDto> aptDealList = aptService.getDealByApartId(id);
//        Map<String, Object> result = new HashMap<>();
//        List<String> labels = new ArrayList<>();
//        List<Map<String, Object>> datasets = new ArrayList<>();
//
//        // 각 거래 유형(매매, 전세, 월세)에 대해 처리
//        for (AptDealTypeDto dto : aptDealList) {
//            String type = dto.getType();
//            List<AptDealDto> deals = dto.getDeals();
//
//            // 라벨 추가
//            labels.add(type);
//
//            // 거래 내역에서 가격 데이터 추출
//            List<Integer> prices = new ArrayList<>();
//            for (AptDealDto deal : deals) {
//                int price = 0;
//                if (type.equals("매매")) {
//                    price = deal.getPrice();
//                } else if (type.equals("전세")) {
//                    price = deal.getGuarantee();
//                } else if (type.equals("월세")) {
//                    price = deal.getMonthly();
//                }
//                prices.add(price);
//            }
//
//            // 데이터셋 생성 및 추가
//            Map<String, Object> dataset = new HashMap<>();
//            dataset.put("label", type);
//            dataset.put("data", prices);
//            datasets.add(dataset);
//        }
//
//        // 결과 데이터 생성
//        result.put("labels", labels);
//        result.put("datasets", datasets);
//
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }

    @GetMapping("/APT/chart/{id}")
    public ResponseEntity<Map<String, Object>> getAptDealChart(@PathVariable Long id) {
        List<AptDealTypeDto> aptDealList = aptService.getDealByApartId(id);
        Map<String, Object> result = new HashMap<>();
        List<String> labels = new ArrayList<>();
        List<Map<String, Object>> datasets = new ArrayList<>();

        // 2022년 3월부터 2023년 2월까지 라벨 추가
        for (int i = 0; i < 12; i++) {
            int year = 2022 + (i / 12);
            int month = (i % 12) + 3;
            if (month > 12) {
                month -= 12;
                year += 1;
            }
            labels.add(String.format("%d%02d", year, month));
        }

        // 거래 유형(매매, 전세, 월세)별로 처리
        List<List<Double>> dealPrices = new ArrayList<>();
        List<String> dealTypes = Arrays.asList("매매", "전세", "월세");
        for (String type : dealTypes) {
            // 거래 내역에서 가격 데이터 추출
            List<Double> prices = new ArrayList<>();
            for (int i = 0; i < 15; i++) {
                double sum = 0;
                int count = 0;
                for (AptDealTypeDto dto : aptDealList) {
                    List<AptDealDto> deals = dto.getDeals();
                    for (AptDealDto deal : deals) {
                        if (deal.getContract_ym().equals(String.format("%d%02d", 2022 + (i / 12), (i % 12)))) {
                            System.out.println(deal+"-------------"+String.format("%d%02d", 2022 + (i / 12), (i % 12)));
                            if (dto.getType().equals(type)) {
                                if (type.equals("매매")) {
                                    sum += deal.getPrice();
                                } else if (type.equals("전세")) {
                                    sum += deal.getGuarantee();
                                } else if (type.equals("월세")) {
                                    sum += deal.getMonthly();
                                }
                                count++;
                            }
                        }
                    }
                }
                double average = count > 0 ? sum / count : Double.NaN;
                prices.add(average);
            }

            dealPrices.add(prices);
        }

        // 데이터셋 생성 및 추가
        for (int i = 0; i < dealTypes.size(); i++) {
            Map<String, Object> dataset = new HashMap<>();
            dataset.put(dealTypes.get(i), aptDealList.size() > 0 ? dealPrices.get(i) : new ArrayList<Double>());
            datasets.add(dataset);
        }

        // 결과 데이터 생성
        result.put("labels", labels);
        result.put("datasets", datasets);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @GetMapping("/OFFICETEL/chart/{id}")
    public ResponseEntity<Map<String, Object>> getOfficetelDealChart(@PathVariable Long id) {
        List<OfficetelDealTypeDto> officetelDealList = officetelService.getDealByOfficetelId(id);
        Map<String, Object> result = new HashMap<>();
        List<String> labels = new ArrayList<>();
        List<Map<String, Object>> datasets = new ArrayList<>();

        // 2022년 3월부터 2023년 2월까지 라벨 추가
        for (int i = 0; i < 12; i++) {
            int year = 2022 + (i / 12);
            int month = (i % 12) + 3;
            if (month > 12) {
                month -= 12;
                year += 1;
            }
            labels.add(String.format("%d%02d", year, month));
        }
        for (int i = 0; i < 2; i++) {
            int year = 2023;
            int month = i + 1;
            labels.add(String.format("%d%02d", year, month));
        }

        // 각 거래 유형(매매, 전세, 월세)에 대해 처리
        for (OfficetelDealTypeDto dto : officetelDealList) {
            String type = dto.getType();
            List<OfficetelDealDto> deals = dto.getDeals();

            // 거래 내역에서 가격 데이터 추출
            List<Double> prices = new ArrayList<>();
            for (int i = 1; i <= 14; i++) {
                double sum = 0;
                int count = 0;
                for (OfficetelDealDto deal : deals) {
                    if (deal.getContract_ym().equals(String.format("%d%02d", 2022 + ((i-1) / 12), ((i-1) % 12) + 3))) {
                        if (type.equals("매매")) {
                            sum += deal.getPrice();
                        } else if (type.equals("전세")) {
                            sum += deal.getGuarantee();
                        } else if (type.equals("월세")) {
                            sum += deal.getMonthly();
                        }
                        count++;
                    }
                }
                double average = count > 0 ? sum / count : Double.NaN;
                prices.add(average);
            }

            // 데이터셋 생성 및 추가
            Map<String, Object> dataset = new HashMap<>();
            dataset.put(type + ":", prices); // 변경된 부분
            datasets.add(dataset);
        }

        // 결과 데이터 생성
        result.put("labels", labels);
        result.put("datasets", datasets);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/VILLA/chart/{id}")
    public ResponseEntity<Map<String, Object>> getVillaDealChart(@PathVariable Long id) {
        List<VillaDealTypeDto> villaDealList = villaService.getDealByVillaId(id);
        Map<String, Object> result = new HashMap<>();
        List<String> labels = new ArrayList<>();
        List<Map<String, Object>> datasets = new ArrayList<>();

        // 2022년 3월부터 2023년 2월까지 라벨 추가
        for (int i = 0; i < 12; i++) {
            int year = 2022 + (i / 12);
            int month = (i % 12) + 3;
            if (month > 12) {
                month -= 12;
                year += 1;
            }
            labels.add(String.format("%d%02d", year, month));
        }
        for (int i = 0; i < 2; i++) {
            int year = 2023;
            int month = i + 1;
            labels.add(String.format("%d%02d", year, month));
        }

        // 각 거래 유형(매매, 전세, 월세)에 대해 처리
        for (VillaDealTypeDto dto : villaDealList) {
            String type = dto.getType();
            List<VillaDealDto> deals = dto.getDeals();

            // 거래 내역에서 가격 데이터 추출
            List<Double> prices = new ArrayList<>();
            for (int i = 1; i <= 14; i++) {
                double sum = 0;
                int count = 0;
                for (VillaDealDto deal : deals) {
                    if (deal.getContract_ym().equals(String.format("%d%02d", 2022 + ((i-1) / 12), ((i-1) % 12) + 3))) {
                        if (type.equals("매매")) {
                            sum += deal.getPrice();
                        } else if (type.equals("전세")) {
                            sum += deal.getGuarantee();
                        } else if (type.equals("월세")) {
                            sum += deal.getMonthly();
                        }
                        count++;
                    }
                }
                double average = count > 0 ? sum / count : Double.NaN;
                prices.add(average);
            }

            // 데이터셋 생성 및 추가
            Map<String, Object> dataset = new HashMap<>();
            dataset.put(type + ":", prices); // 변경된 부분
            datasets.add(dataset);
        }

        // 결과 데이터 생성
        result.put("labels", labels);
        result.put("datasets", datasets);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}