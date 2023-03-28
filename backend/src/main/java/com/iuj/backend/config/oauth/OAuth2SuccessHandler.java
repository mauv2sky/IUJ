package com.iuj.backend.config.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuj.backend.api.domain.dto.common.UserDto;
import com.iuj.backend.api.domain.dto.common.TokenDto;
import com.iuj.backend.api.domain.entity.User;
import com.iuj.backend.api.repository.UserRepository;
import com.iuj.backend.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private RequestCache requestCache = new HttpSessionRequestCache();
    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
    private final JwtTokenProvider tokenProvider;
    private final UserRequestMapper userRequestMapper;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        UserDto userDto = userRequestMapper.toDto(oAuth2User);

        // DB에서 유저정보 가져오기
        User user = userRepository.findByEmail(userDto.getEmail());

        TokenDto tokenDto = null;

        if(user == null) { // 회원가입
            // access token 과 refresh token 발급
            tokenDto = tokenProvider.generateAllToken(userDto.getEmail(), "USER");
            log.info("{}", tokenDto);

            user.setEmail(userDto.getEmail());
            user.setNickname(userDto.getNickname());
            user.setRefreshToken(tokenDto.getRefreshToken());
            userRepository.save(user);
        } else {    // 로그인
            // access token 발급
            tokenDto = tokenProvider.generateToken(userDto.getEmail(), "USER");
            log.info("{}", tokenDto);
        }

        // 구글에 등록된 redirect_uri으로 인가코드 전달받음
        // 근데 이미 필요한 정보는 다 받았다. -> 받은 code로 access token을 요청할 필요 없다
        // 프론트의 로그인 성공 후 이동할 페이지로 token을 전달한다.
        String targetUrl = UriComponentsBuilder.fromUriString("/home")
                .queryParam("token", tokenDto)
                .build().toUriString();

        resultRedirectStrategy(request, response, authentication);

    }

    private void resultRedirectStrategy(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        SavedRequest savedRequest = requestCache.getRequest(request, response);

        if(savedRequest != null) {
            String targetUrl = savedRequest.getRedirectUrl();

            redirectStrategy.sendRedirect(request, response, targetUrl);
        } else {
            redirectStrategy.sendRedirect(request, response, "/home");
        }
    }
}
