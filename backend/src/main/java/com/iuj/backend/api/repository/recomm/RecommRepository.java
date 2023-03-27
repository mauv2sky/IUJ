package com.iuj.backend.api.repository.recomm;

import com.iuj.backend.api.domain.entity.FavFilter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;


@Repository
@Transactional
public interface RecommRepository extends JpaRepository<FavFilter, Long> {
    // 선호 조회
    // @Query("SELECT b FROM FavFilter b WHERE b.email = :email")
    List<FavFilter> findByEmail(String email);


    FavFilter findById_(BigInteger id);


    // 선호 등록
    FavFilter save(FavFilter favFilter);


    void deleteById(BigInteger id);
}