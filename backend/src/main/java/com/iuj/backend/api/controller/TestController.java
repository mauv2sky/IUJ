package com.iuj.backend.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/main")
    public void home() {
        System.out.println("👋 home");
    }
}