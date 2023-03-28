package com.iuj.backend.config.jwt;

import com.iuj.backend.api.domain.dto.common.TokenDto;
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

    @Value("${spring.jwt.secret}")
    private String secretKey = "secretKey";
    private final long ACCESS_TOKEN_EXPIRE_TIME = 10L * 60 * 60; // 1시간
    private final long REFRESH_TOKEN_EXPIRE_TIME = 60 * 60 * 24 * 14; // 2주

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

    private String doGenerateToken(Claims claims, long tokenValidTime) {
        System.out.println(new Date(System.currentTimeMillis() + tokenValidTime));
        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
        return token;
    }


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

    // Request의 Header에서 token 값을 가져옴.
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader(HttpHeaders.AUTHORIZATION);
    }

    // 토큰의 유효성 + 만료일자 확인
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
    public Date getExpiration(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return claims.getBody().getExpiration();
        } catch (Exception e) {
            return null;
        }
    }
}
