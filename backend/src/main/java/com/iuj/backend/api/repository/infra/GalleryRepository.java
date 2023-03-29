package com.iuj.backend.api.repository.infra;

import com.iuj.backend.api.domain.entity.infra.Cctv;
import com.iuj.backend.api.domain.entity.infra.Gallery;
import com.iuj.backend.api.domain.entity.infra.Library;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GalleryRepository extends JpaRepository<Gallery, Integer> {

    @Query("select b from Gallery b where b.lat > :minLatitude and b.lat < :maxLatitude and b.lng > :minLongitude and b.lng < :maxLongitude")
    List<Gallery> findAllGalleryBtwlngAndlat(
            @Param("minLatitude") String minLatitude,
            @Param("maxLatitude") String maxLatitude,
            @Param("minLongitude") String minLongitude,
            @Param("maxLongitude") String maxLongitude);

}
