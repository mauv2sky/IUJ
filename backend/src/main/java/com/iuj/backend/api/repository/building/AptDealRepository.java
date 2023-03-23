package com.iuj.backend.api.repository.building;

import com.iuj.backend.api.domain.entity.building.AptDeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AptDealRepository extends JpaRepository<AptDeal,Long> {
    List<AptDeal> findByAptId(Long apt_id);

}
