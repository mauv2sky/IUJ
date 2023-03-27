package com.iuj.backend.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuj.backend.api.domain.dto.response.TokenDto;
import com.iuj.backend.config.jwt.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@RestController(value = "/api/token")
@AllArgsConstructor
public class TokenController {

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;

    @GetMapping("/expired")
    public String auth() {
        throw new RuntimeException();
    }

    @GetMapping("/refresh")
    public void refreshAuth(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String token = jwtTokenProvider.resolveToken(request);

        // 유효한 토큰인지 확인
        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            if (jwtTokenProvider.validateToken(jwtToken)) {
                String email = jwtTokenProvider.getUserEmail(jwtToken);
                TokenDto tokenDto = jwtTokenProvider.generateAllToken(email, "USER");

                response.addHeader("Bearer", tokenDto.getAccessToken());
                response.addHeader("Refresh", tokenDto.getRefreshToken());
                response.setContentType("application/json;charset=UTF-8");

                PrintWriter writer = response.getWriter();
                writer.println(objectMapper.writeValueAsString(tokenDto));
                writer.flush();
            }
        }
    }
}
