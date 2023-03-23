package com.iuj.backend.api.repository.like;

import com.iuj.backend.api.domain.entity.LikeBuilding;
import com.iuj.backend.api.domain.entity.LikeBuildingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

// 관심 조회
@Repository
public interface LikeRepository extends JpaRepository<LikeBuilding, LikeBuildingId> {
    @Query("SELECT b FROM LikeBuilding b WHERE b.email = :email")
    List<LikeBuilding> findByEmail(String email);

//    @Query("SELECT b FROM LikeBuilding b WHERE b.email = :email")
//    List<LikeBuilding> findByEmail(String email);
//    List<LikeBuilding> findAll();
}

