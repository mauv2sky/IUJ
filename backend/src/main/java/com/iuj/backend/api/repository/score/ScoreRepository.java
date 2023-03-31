package com.iuj.backend.api.repository.score;


import com.iuj.backend.api.domain.entity.building.Score;
import com.iuj.backend.api.domain.entity.building.ScoreId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface ScoreRepository extends JpaRepository<Score, ScoreId> {
    List<Score> getScoreByTypeAndIdIsIn(String type, List<Long> id);
}
