package com.iuj.backend.api.repository.building;

import com.iuj.backend.api.domain.entity.building.AptDeal;
import com.iuj.backend.api.domain.entity.building.OfficetelDeal;
import com.iuj.backend.api.domain.entity.building.VillaDeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VillaDealRepository extends JpaRepository<VillaDeal,Long> {
    List<VillaDeal> findByVillaId(Long villa_id);

}
