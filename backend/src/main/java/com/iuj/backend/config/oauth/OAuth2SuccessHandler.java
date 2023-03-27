package com.iuj.backend.config.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuj.backend.api.domain.dto.common.UserDto;
import com.iuj.backend.api.domain.dto.response.TokenDto;
import com.iuj.backend.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;
    private final UserRequestMapper userRequestMapper;
    private final ObjectMapper objectMapper;

    // DB에서 User 정보를 가져와서 토큰 생성 및 전달
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        UserDto userDto = userRequestMapper.toDto(oAuth2User);

        TokenDto tokenDto = tokenProvider.generateAllToken(userDto.getEmail(), "USER");
        log.info("{}", tokenDto);

        writeTokenResponse(response, tokenDto);
    }

    private void writeTokenResponse(HttpServletResponse response, TokenDto tokenDto) throws IOException {
        response.setContentType("text/html;charset=UTF-8");

        response.addHeader("Bearer", tokenDto.getAccessToken());
        response.addHeader("Refresh", tokenDto.getRefreshToken());
        response.setContentType("application/json;charset=UTF-8");

        PrintWriter writer = response.getWriter();
        writer.println(objectMapper.writeValueAsString(tokenDto));
        writer.flush();
    }
}
