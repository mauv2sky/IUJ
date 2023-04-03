package com.iuj.backend.config.jwt;

import com.iuj.backend.api.domain.dto.common.TokenDto;
import com.iuj.backend.api.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final Logger LOGGER = LoggerFactory.getLogger(JwtTokenProvider.class);
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final UserRepository userRepository;

    @Value("${spring.jwt.secret}")
    private String secretKey = "secretKey";
    private final long ACCESS_TOKEN_EXPIRE_TIME = 1000L * 30 * 60;
    private final long REFRESH_TOKEN_EXPIRE_TIME = 1000L * 24 * 14 * 60 * 60;

    @PostConstruct
    protected void init() {
        LOGGER.info("[init] JwtTokenProvider 내 secretKey 초기화 시작");
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * accessToken, RefreshToken 발급
     * */
    public TokenDto generateAllToken(String userEmail, String role) {
        LOGGER.info("[createAllToken] 토큰 생성 시작 !");
        Claims claims = Jwts.claims().setSubject(userEmail);

        // access token
        String accessToken = doGenerateToken(claims, ACCESS_TOKEN_EXPIRE_TIME);
        // refresh token
        String refreshToken = doGenerateToken(claims, REFRESH_TOKEN_EXPIRE_TIME);

        //원하는 데이터 포맷 지정
        Date accessTokenExpiresInDate = new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRE_TIME);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy.MM.dd/HH:mm:ss");
        String accessTokenExpiresIn = simpleDateFormat.format(accessTokenExpiresInDate);

        return new TokenDto(accessToken, refreshToken, accessTokenExpiresIn);
    }

    /**
     * accessToken만 발급
     * */
    public TokenDto generateToken(String userEmail, String role) {
        LOGGER.info("[createToken] 토큰 생성 시작 !");
        Claims claims = Jwts.claims().setSubject(userEmail);

        // access token
        String accessToken = doGenerateToken(claims, ACCESS_TOKEN_EXPIRE_TIME);

        //원하는 데이터 포맷 지정
        Date accessTokenExpiresInDate = new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRE_TIME);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy.MM.dd/HH:mm:ss");
        String accessTokenExpiresIn = simpleDateFormat.format(accessTokenExpiresInDate);

        return new TokenDto(accessToken, "", accessTokenExpiresIn);
    }

    /**
     * 실제 token 발급
     * */
    private String doGenerateToken(Claims claims, long tokenValidTime) {
        LOGGER.info("[doGenerateToken] " + new Date(System.currentTimeMillis() + tokenValidTime));
        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
        return token;
    }

    /**
     * 토큰 인증 정보 조회 (DB에서 유저 정보 확인)
     * */
    public Authentication getAuthentication(String token) {
        LOGGER.info("[getAuthentication] 토큰 인증 정보 조회 시작");
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(this.getUserEmail(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String getUserEmail(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    private Claims getClaim(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    /**
     * request 헤더에서 token을 가져온다
     * */
    public String resolveToken(HttpServletRequest request, String type) {
        return type.equals("Access") ? request.getHeader(HttpHeaders.AUTHORIZATION) : request.getHeader("Refresh");
    }

    /**
     * access token 유효성, 만료일자 확인
     * */
    public boolean validateToken(String jwtToken) {
        LOGGER.info("[validateToken] 토큰 유효성 + 만료일자 확인");
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return claims.getBody().getExpiration().after(new Date(System.currentTimeMillis()));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * refresh token 유효성 검증
     * */
    public boolean validateRefreshToken(String jwtToken) {
        // 1차 토큰 검증
        if(!validateToken(jwtToken)) return false;

        // DB에 저장한 토큰과 비교
        String refreshToken = userRepository.findByEmail(getUserEmail(jwtToken)).getRefreshToken();
        return refreshToken != null && jwtToken.equals(refreshToken);
    }

    public Date getExpiration(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return claims.getBody().getExpiration();
        } catch (Exception e) {
            return null;
        }
    }
}
