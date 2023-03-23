package com.iuj.backend.api.repository.infra;

import com.iuj.backend.api.domain.entity.infra.BusStop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusStopRepository extends JpaRepository<BusStop, Integer> {
    List<BusStop> findAll();
    List<BusStop> findAllBusBtwlngAndlat(double minLatitude, double maxLatitude, double minLongitude, double maxLongitude);
}
