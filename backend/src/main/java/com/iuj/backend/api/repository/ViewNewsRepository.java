package com.iuj.backend.api.repository;

import com.iuj.backend.api.domain.entity.ViewNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ViewNewsRepository extends JpaRepository<ViewNews, String> {
    @Query(value = "SELECT * FROM view_news where email = :email and news_id = :newsId and updated_at > CURRENT_DATE() limit 1",nativeQuery = true)
    ViewNews getOneTodayViewByEmailAndNewsId(String email, int newsId);

    @Query(value = "SELECT * FROM view_news where email = :email order by updated_at limit 1",nativeQuery = true)
    ViewNews getTopMyRecentView(String email);

    @Query(value = "SELECT * FROM view_news where email = :email and updated_at > CURRENT_DATE()",nativeQuery = true)
    List<ViewNews> getMyRecentView(String email);
    List<ViewNews> getViewNewsByEmail(String email);
}
