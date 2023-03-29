package com.iuj.backend.api.repository.like;

import com.iuj.backend.api.domain.entity.LikeBuilding;
import com.iuj.backend.api.domain.entity.LikeBuildingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface LikeRepository extends JpaRepository<LikeBuilding, LikeBuildingId> {
    // 관심 조회
    @Query("SELECT b FROM LikeBuilding b WHERE b.email = :email")
    List<LikeBuilding> findByEmail(String email);

    // 관심 등록, 네이티브 쿼리를 사용하기 때문에 entity파일을 거치지 않고 바로 db테이블로 접근
    @Modifying
    @Transactional
    @Query(value="INSERT INTO like_building (id, type, email) VALUES (:id, :type, :email)", nativeQuery=true)
    void saveQuery(@Param("id") Long id, @Param("type") String type, @Param("email") String email);
}