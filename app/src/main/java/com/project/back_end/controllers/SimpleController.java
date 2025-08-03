package com.project.back_end.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleController {

    @GetMapping("/test")
    public String test() {
        return "Hello! Spring Boot is working!";
    }

    @GetMapping("/api/simple")
    public String apiTest() {
        return "API endpoint is working!";
    }
}
