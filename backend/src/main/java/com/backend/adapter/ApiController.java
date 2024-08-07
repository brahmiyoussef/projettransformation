package com.backend.adapter;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/verify")
    public String verifyToken(Principal principal) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof JwtAuthenticationToken jwtAuthToken) {
            String username = jwtAuthToken.getTokenAttributes().get("preferred_username").toString();
            String email = jwtAuthToken.getTokenAttributes().get("email").toString();
            return "Token is valid! User: " + username + ", Email: " + email;
        }
        return "Invalid token";
    }
}
