package com.iuj.backend.api.repository.building;

import com.iuj.backend.api.domain.entity.building.Officetel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfficetelRepository extends JpaRepository<Officetel, Long> {
}
