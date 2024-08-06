package com.backend.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

@SpringBootApplication
@EntityScan(basePackages = "com.backend.backend.domain")
@EnableJpaRepositories(basePackages = "com.backend.backend.domain.repositories")
@CrossOrigin()
public class  BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	@Bean
	public CorsConfigurationSource configurationSource(){
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH","DELETE","OPTIONS"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("authorization","content-type","x-auth-token"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Authorization","x-auth-token"));
		UrlBasedCorsConfigurationSource source =new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**",corsConfiguration);
		return source;
	}


}
