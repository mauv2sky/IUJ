package com.iuj.backend.config.oauth;

import com.iuj.backend.api.domain.dto.common.UserDto;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class UserRequestMapper {

    public UserDto toDto(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();
        return UserDto.builder()
                .email((String) attributes.get("email"))
                .nickname((String) attributes.get("name"))
                .build();
    }
}
