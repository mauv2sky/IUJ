package com.iuj.backend.api.repository.infra;

import com.iuj.backend.api.domain.entity.infra.Academy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AcademyRepository extends JpaRepository<Academy, Integer> {
    List<Academy> findAll();

    @Query("select a from Academy a where a.lat> :minLatitude and a.lat < :maxLatitude and a.lng > :minLongitude and a.lng<:maxLongitude")
    List<Academy> findAllAcademyBtwlatAndlat(
            @Param("minLatitude") String minLatitude,
            @Param("maxLatitude") String maxLatitude,
            @Param("minLongitude") String minLongitude,
            @Param("maxLongitude") String maxLongitude
    );

}
