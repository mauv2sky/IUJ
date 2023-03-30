package com.iuj.backend.api.repository.building;

import com.iuj.backend.api.domain.dto.mapping.LocationMapping;
import com.iuj.backend.api.domain.entity.building.Officetel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfficetelRepository extends JpaRepository<Officetel, Long> {
    @Query("select a.id as id, a.lat as lat, a.lng as lng, a.name as name from Officetel a where a.lat > :minLatitude and a.lat < :maxLatitude and a.lng > :minLongitude and a.lng < :maxLongitude")
    List<LocationMapping> getByBound(@Param("minLatitude") String minLatitude, @Param("minLongitude") String minLongitude, @Param("maxLatitude") String maxLatitude, @Param("maxLongitude") String maxLongitude);

}
