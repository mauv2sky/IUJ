package com.iuj.backend.api.repository.building;


import com.iuj.backend.api.domain.entity.building.Apt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AptRepository extends JpaRepository<Apt, Long> {
//    @Query("SELECT apt FROM Apt apt, AptDeal aptDeal WHERE apt.id = :apt_id")
//    @Query("SELECT new com.iuj.backend.api.domain.entity.building.Apt(id, sigungu, bungi, name, builtYear, roadAddr, lat, lng) FROM Apt")
//    List<Apt> findAllApts();

}
