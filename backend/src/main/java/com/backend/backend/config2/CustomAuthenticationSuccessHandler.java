package com.backend.backend.config2;

import io.micrometer.common.lang.NonNull;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie; // Use jakarta.servlet.http.Cookie

import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler, ApplicationContextAware {

    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(@NonNull ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        if (authentication instanceof OAuth2AuthenticationToken oauthToken) {

            OAuth2AuthorizedClientService authorizedClientService = applicationContext.getBean(OAuth2AuthorizedClientService.class);
            OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
                    oauthToken.getAuthorizedClientRegistrationId(),
                    oauthToken.getName());

            String accessToken = client.getAccessToken().getTokenValue();
            System.out.println("Access Token: " + accessToken);

            // Store the token in a cookie
            Cookie cookie = new Cookie("accessToken", accessToken);
            cookie.setHttpOnly(false);  // Make sure it's accessible via JavaScript
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60); // 1 hour expiry
            response.addCookie(cookie);
        }

        // Redirect to the frontend application after successful login
        response.sendRedirect("http://localhost:3000/home");
    }
}
