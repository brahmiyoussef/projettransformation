package com.backend.backend; // Replace with your package name

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class helloworldcontroller {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }
}