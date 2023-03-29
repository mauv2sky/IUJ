package com.iuj.backend.api.repository.infra;

import com.iuj.backend.api.domain.entity.infra.Cctv;
import com.iuj.backend.api.domain.entity.infra.Cinema;
import com.iuj.backend.api.domain.entity.infra.Park;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParkRepository extends JpaRepository<Park, Integer> {

    @Query("select b from Park b where b.lat > :minLatitude and b.lat < :maxLatitude and b.lng > :minLongitude and b.lng < :maxLongitude")
    List<Park> findAllParkBtwlngAndlat(
            @Param("minLatitude") String minLatitude,
            @Param("maxLatitude") String maxLatitude,
            @Param("minLongitude") String minLongitude,
            @Param("maxLongitude") String maxLongitude);

}
