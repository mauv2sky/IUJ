package com.iuj.backend.api.repository.building;


import com.iuj.backend.api.domain.dto.common.BoundDto;
import com.iuj.backend.api.domain.dto.mapping.LocationMapping;
import com.iuj.backend.api.domain.dto.response.BuildingDto;
import com.iuj.backend.api.domain.entity.building.Apt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AptRepository extends JpaRepository<Apt, Long> {
    @Query("select a.id as id, a.lat as lat, a.lng as lng, a.name as name from Apt a where a.lat > :minLatitude and a.lat < :maxLatitude and a.lng > :minLongitude and a.lng < :maxLongitude")
    List<LocationMapping> getByBound(String minLatitude, String minLongitude, String maxLatitude, String maxLongitude);
//    @Query("SELECT apt FROM Apt apt, AptDeal aptDeal WHERE apt.id = :apt_id")
//    @Query("SELECT new com.iuj.backend.api.domain.entity.building.Apt(id, sigungu, bungi, name, builtYear, roadAddr, lat, lng) FROM Apt")
//    List<Apt> findAllApts();

}
