package com.iuj.backend.api.repository.recomm;

import com.iuj.backend.api.domain.entity.FavFilter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RecommRepository extends JpaRepository<FavFilter, Long> {
    // 선호 조회
    // @Query("SELECT b FROM FavFilter b WHERE b.email = :email")
    List<FavFilter> findByEmail(String email);

    // 선호 등록
    // 네이티브 쿼리를 사용하기 때문에 entity파일을 거치지 않고 바로 db테이블로 접근
//    @Modifying
//    @Transactional
//    @Query(value="INSERT INTO like_building (id, type, email) VALUES (:id, :type, :email)", nativeQuery=true)
//    void saveQuery(@Param("id") Long id, @Param("type") String type, @Param("email") String email);
}