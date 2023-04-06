package com.iuj.backend.api.domain.entity;

import com.iuj.backend.api.domain.dto.common.BaseTime;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ViewNews extends BaseTime {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String email;

    @Column(name = "news_id")
    private int newsId;

}
