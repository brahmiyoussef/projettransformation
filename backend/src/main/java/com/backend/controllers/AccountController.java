package com.backend.controllers;

import com.backend.infrastructure.postgres.repositories.UserRepository;
import com.backend.infrastructure.postgres.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userInfo")
public class AccountController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<User> getUserInfoById(@RequestParam Long userId) {
        return userRepository.findById(userId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
