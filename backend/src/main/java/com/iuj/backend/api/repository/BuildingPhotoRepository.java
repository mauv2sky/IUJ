package com.iuj.backend.api.repository;

import com.iuj.backend.api.domain.entity.BuildingPhoto;
import com.iuj.backend.api.domain.entity.building.BuildingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface BuildingPhotoRepository extends JpaRepository<BuildingPhoto, BuildingId> {
    List<BuildingPhoto> getScoreByTypeAndIdIsIn(String type, java.util.List<Long> id);
}

