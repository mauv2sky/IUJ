package com.iuj.backend.config.oauth;

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
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private RequestCache requestCache = new HttpSessionRequestCache();
    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
    private final JwtTokenProvider tokenProvider;
    private final UserRequestMapper userRequestMapper;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        UserDto userDto = userRequestMapper.toDto(oAuth2User);

        // access token 과 refresh token 발급
        TokenDto tokenDto = tokenProvider.generateAllToken(userDto.getEmail(), "USER");
        log.info("{}", tokenDto);

        // DB에서 유저정보 가져오기
        Optional<User> user = userRepository.findByEmail(userDto.getEmail());

        if(user.isEmpty()) { // user DB 저장
            User newUser = new User();
            newUser.setEmail(userDto.getEmail());
            newUser.setNickname(userDto.getNickname());
            newUser.setRefreshToken(tokenDto.getRefreshToken());
            userRepository.save(newUser);
        } else { // refresh token 수정 -> 마지막 로그인 시간 체크
            User realUser = user.get();
            realUser.setRefreshToken(tokenDto.getRefreshToken());
            userRepository.save(realUser);
        }

        Optional<User> realUser = userRepository.findByEmail(userDto.getEmail());
        tokenDto.setUserName(realUser.get().getNickname());

        resultRedirectStrategy(request, response, tokenDto);
    }

    private void resultRedirectStrategy(HttpServletRequest request, HttpServletResponse response, TokenDto tokenDto) throws IOException, ServletException {

        SavedRequest savedRequest = requestCache.getRequest(request, response);

        if(savedRequest != null) { // 권한없는 페이지 요청했을 경우
            String savedUrl = savedRequest.getRedirectUrl();
            String targetUrl = UriComponentsBuilder.fromUriString("https://j8e103.p.ssafy.io" + savedUrl)
                    .queryParam("access_token", tokenDto.getAccessToken())
                    .queryParam("refresh_token", tokenDto.getRefreshToken())
                    .queryParam("expiration_date", tokenDto.getAccessTokenExpiresIn())
                    .queryParam("user_name", tokenDto.getUserName())
                    .encode(StandardCharsets.UTF_8)
                    .build().toUriString();

            redirectStrategy.sendRedirect(request, response, targetUrl);
        } else { // 소셜로그인 요청일 경우
            String targetUrl = UriComponentsBuilder.fromUriString("https://j8e103.p.ssafy.io")
                    .queryParam("access_token", tokenDto.getAccessToken())
                    .queryParam("refresh_token", tokenDto.getRefreshToken())
                    .queryParam("expiration_date", tokenDto.getAccessTokenExpiresIn())
                    .queryParam("user_name", tokenDto.getUserName())
                    .encode(StandardCharsets.UTF_8)
                    .build().toUriString();

            redirectStrategy.sendRedirect(request, response, targetUrl);
        }
    }
}
