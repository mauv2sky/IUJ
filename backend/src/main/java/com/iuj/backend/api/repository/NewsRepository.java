package com.iuj.backend.api.repository;

import com.iuj.backend.api.domain.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Integer> {
    List<News> getNewsBySchoolAndLocalEquals(String school, String local);
    List<News> getTop6BySchoolAndLocalEquals(String school, String local);
}
