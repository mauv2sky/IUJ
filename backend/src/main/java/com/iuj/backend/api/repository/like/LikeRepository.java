package com.iuj.backend.api.repository.like;

import com.iuj.backend.api.domain.entity.LikeBuilding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// 관심 등록
@Repository
public interface LikeRepository extends JpaRepository<LikeBuilding, Integer> {

}
