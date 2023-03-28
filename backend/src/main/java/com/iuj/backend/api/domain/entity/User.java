package com.iuj.backend.api.domain.entity;

import com.iuj.backend.api.domain.dto.common.BaseTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString
public class User extends BaseTime {

    @Id
    @Column
    private String email;

    @Column
    private String nickname;

    @Column(name = "refresh_token")
    private String refreshToken;

}
