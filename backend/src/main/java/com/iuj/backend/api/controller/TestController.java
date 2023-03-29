package com.iuj.backend.api.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class TestController {

    @GetMapping("/api/like")
    public void like(Principal principal, Authentication authentication) {
        System.out.println("❤️ like");

        System.out.println("authentication.getName() : " + authentication.getName());
        System.out.println("principal.getName() : " + principal.getName());

    }

    @GetMapping("/")
    public void home() {
        System.out.println("👋 home");
    }
}