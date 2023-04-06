package com.iuj.backend.api.repository;

import com.iuj.backend.api.domain.entity.SearchRegion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchRegionRepository extends JpaRepository<SearchRegion, String> {
}
