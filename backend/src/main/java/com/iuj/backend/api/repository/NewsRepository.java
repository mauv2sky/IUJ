package com.iuj.backend.api.repository;

import com.iuj.backend.api.domain.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Integer> {
    List<News> getNewsBySchoolAndLocalEquals(String school, String local);

    @Query(value = "SELECT * FROM news order by RAND() limit 6",nativeQuery = true)
    List<News> getTop6ByRandom(@Param("school") String school, @Param("local") String local);

    @Query(value = "SELECT * FROM news where id not in :list order by RAND() limit :limitNum",nativeQuery = true)
    List<News> getNewsByIdIsNotInOrderByRandomLimit(@Param("list") List<Integer> list, @Param("limitNum") int limitNum);

    @Query(value = "SELECT * FROM news where school = :school and local = :local order by RAND() limit 6",nativeQuery = true)
    List<News> getTop6BySchoolAndLocalEquals(@Param("school") String school, @Param("local") String local);
}
