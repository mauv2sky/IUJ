package com.iuj.backend.api.domain.entity;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class LikeBuilding {
    @Id
    private Long building_id;

    @Column(length=10)
    private String type;

    @Column(length=25)
    private String email;
}