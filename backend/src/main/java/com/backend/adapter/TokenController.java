package com.backend.adapter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TokenController {

    @GetMapping("/get-token")
    public String getToken() {
        return "This is a token endpoint!";
    }
}
