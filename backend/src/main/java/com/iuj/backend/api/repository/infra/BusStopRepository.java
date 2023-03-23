package com.iuj.backend.api.repository.infra;

import com.iuj.backend.api.domain.entity.infra.BusStop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BusStopRepository extends JpaRepository<BusStop, Integer> {
    List<BusStop> findAll();
    @Query("select b from BusStop b where b.lat > :minLatitude and b.lat < :maxLatitude and b.lng > :minLongitude and b.lng < :maxLongitude")
    List<BusStop> findAllBusBtwlngAndlat(double minLatitude, double maxLatitude, double minLongitude, double maxLongitude);
}
