// Source code is decompiled from a .class file using FernFlower decompiler.
package com.backend.config2;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
   public SecurityConfig() {
   }

   @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      http.cors(Customizer.withDefaults()).csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests((authz) -> {
         ((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)authz.requestMatchers(new String[]{"/api/convert/login"})).permitAll().anyRequest()).authenticated();
      }).oauth2ResourceServer((oauth2) -> {
         oauth2.jwt((jwt) -> {
            jwt.jwtAuthenticationConverter(this.jwtAuthenticationConverter());
         });
      });
      return (SecurityFilterChain)http.build();
   }

   @Bean
   public JwtAuthenticationConverter jwtAuthenticationConverter() {
      return new JwtAuthenticationConverter();
   }

   @Bean
   public RestTemplate restTemplate() {
      return new RestTemplate();
   }
}
