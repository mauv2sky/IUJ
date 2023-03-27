package com.iuj.backend.api.repository.recomm;

import com.iuj.backend.api.domain.entity.FavFilter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RecommRepository extends JpaRepository<FavFilter, Long> {
    // 선호 조회
    // @Query("SELECT b FROM FavFilter b WHERE b.email = :email")
    List<FavFilter> findByEmail(String email);

    FavFilter save(FavFilter favFilter);

    List<FavFilter> findById(String id);
}