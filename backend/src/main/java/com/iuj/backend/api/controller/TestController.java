package com.iuj.backend.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/like")
    public void like(@RequestParam(name = "access_token", required = false) String accessToken) {
        System.out.println("accessToken : " + accessToken);
        System.out.println("❤️ like");

    }

    @GetMapping("/")
    public void home() {
        System.out.println("👋 home");
    }
}