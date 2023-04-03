package com.iuj.backend.config.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuj.backend.api.domain.dto.common.TokenDto;
import com.iuj.backend.api.domain.enums.ErrorCode;
import com.iuj.backend.api.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 헤더에서 JWT 받아옴
        String accessToken = jwtTokenProvider.resolveToken(request, "Access");
        String refreshToken = jwtTokenProvider.resolveToken(request, "Refresh");

        // 유효한 토큰인지 확인
        if (accessToken != null && accessToken.startsWith("Bearer ")) {
            String jwtToken = accessToken.substring(7);
            if (jwtTokenProvider.validateToken(jwtToken)) {
                // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옴
                Authentication authentication = jwtTokenProvider.getAuthentication(jwtToken);
                // SecurityContext 에 Authentication 객체를 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } else if (refreshToken != null) {
                // 리프레시 토큰 검증 && 리프레시 토큰 DB에서 토큰 존재 유무 확인
                boolean isRefreshToken = jwtTokenProvider.validateRefreshToken(refreshToken);

                if(isRefreshToken) {
                    System.out.println("+++++++++++++++++++++++++++++++++++++++++리프레시토큰");
                    // 리프레시 토큰으로 아이디 정보 가져오기
                    String userEmail = jwtTokenProvider.getUserEmail(refreshToken);
                    // 새로운 access token 발급
                    TokenDto newToken = jwtTokenProvider.generateAllToken(userEmail, "User");
                    // 헤더에 토큰 추가
                    response.setHeader("access_token", newToken.getAccessToken());
                    response.setHeader("refresh_token", newToken.getRefreshToken());
                    response.setHeader("expiration_date", newToken.getAccessTokenExpiresIn());
                    // Security Context에 인증 정보 넣기
                    SecurityContextHolder.getContext().setAuthentication(jwtTokenProvider.getAuthentication(newToken.getAccessToken()));
                } else {
                    // 사용할 수 없는 refresh token 에러 처리
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");

                    ObjectMapper objectMapper = new ObjectMapper();
                    String result = objectMapper.writeValueAsString(new CustomException(ErrorCode.EXPIRED_REFRESH_TOKEN));
                    response.getWriter().write(result);
                }
            }
        } else {
            log.debug("JWT Token does not begin with Bearer String");
        }

        filterChain.doFilter(request, response);
    }
}
