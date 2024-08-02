package com.backend.adapter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

@RestController
public class HomeController {

    @GetMapping("/public")
    public String publicPage() {
        return "This is a public page";
    }

    @GetMapping("/protected")
    public String protectedPage(@AuthenticationPrincipal OidcUser oidcUser) {
        return "This is a protected page. User: " + oidcUser.getFullName();
    }

    @GetMapping("/logout")
    public String logoutPage() {
        return "You have been logged out.";
    }
}
