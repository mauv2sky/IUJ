package com.iuj.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@Configuration
public class WebMvcConfig implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println("config - corsMapping");

        registry.addMapping("/**")
                .allowedMethods(CorsConfiguration.ALL)
                .allowedHeaders(CorsConfiguration.ALL)
                .allowedOrigins("http://localhost:8080", "http://localhost:80", "http://localhost:5173")
                .allowedOriginPatterns(CorsConfiguration.ALL)
//                .allowedOriginPatterns(CorsConfiguration.ALL, "*")
                .allowCredentials(true);
    }
}
