package com.iuj.backend.config;

import com.iuj.backend.config.jwt.JwtAuthenticationFilter;
import com.iuj.backend.config.jwt.JwtTokenProvider;
import com.iuj.backend.config.oauth.CustomOAuth2UserService;
import com.iuj.backend.config.oauth.OAuth2SuccessHandler;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler successHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .httpBasic().disable()
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .authorizeRequests()    // 관심 건물, 필터 추가시에는 로그인 필요
                .antMatchers("/api/like").authenticated()
                .anyRequest().permitAll()
            .and()
                .oauth2Login().loginPage("/token/expired")
                .successHandler(successHandler)
                .userInfoEndpoint().userService(oAuth2UserService);

        http
            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
