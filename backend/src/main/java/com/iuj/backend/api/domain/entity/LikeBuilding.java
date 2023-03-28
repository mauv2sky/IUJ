// 정의된 복합키를 사용한 엔티티
package com.iuj.backend.api.domain.entity;

import lombok.*;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@Getter
@Setter
@ToString
@IdClass(LikeBuildingId.class)
@AllArgsConstructor
@NoArgsConstructor
public class LikeBuilding {
    @Id
    private Long id;
    @Id
    private String type;
    @Id
    private String email;

}
