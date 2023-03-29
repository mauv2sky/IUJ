package com.iuj.backend.api.repository.infra;

import com.iuj.backend.api.domain.entity.infra.School;
import com.iuj.backend.api.domain.entity.infra.Subway;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchoolRepository extends JpaRepository<School,Integer> {
    List<School> findAll();

    @Query("select b from School b where b.lat > :minLatitude and b.lat < :maxLatitude and b.lng > :minLongitude and b.lng < :maxLongitude")
    List<School> findAllSchoolBtwlngAndlat(
        @Param("minLatitude") String minLatitude,
        @Param("maxLatitude") String maxLatitude,
        @Param("minLongitude") String minLongitude,
        @Param("maxLongitude") String maxLongitude);
}
