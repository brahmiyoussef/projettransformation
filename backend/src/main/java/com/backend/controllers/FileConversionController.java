package com.backend.controllers;

import com.backend.domain.services.JwtDecodingService;
import com.backend.infrastructure.postgres.entities.InputFile;
import com.backend.infrastructure.postgres.entities.OutputFile;
import com.backend.infrastructure.postgres.entities.User;
import com.backend.infrastructure.postgres.repositories.InputFileRepository;
import com.backend.infrastructure.postgres.repositories.OutputFileRepository;
import com.backend.domain.services.TransformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/convert")
public class FileConversionController {
    @Autowired
    private TransformationService transformationService;
    @Autowired
    private InputFileRepository inputFileRepository;
    @Autowired
    private JwtDecodingService jwtDecodingService;
    @Autowired
    private OutputFileRepository outputFileRepository;

    @PostMapping("/login")
    public User saveUserDetails(@RequestHeader("Authorization") String authorizationHeader) {
        String token = extractToken(authorizationHeader);
        User user = jwtDecodingService.saveUserDetailsFromToken(token);
        System.out.println("user info after the login :" + user);
        return user;
    }
    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7); // Remove "Bearer " prefix
        }
        throw new IllegalArgumentException("Invalid Authorization header format");
    }

    @PostMapping(value = "/{fromFormat}/{toFormat}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE, MediaType.TEXT_PLAIN_VALUE})
    public String convertFile(
            @RequestParam("file") MultipartFile file,
            @PathVariable String fromFormat,
            @PathVariable String toFormat,
            @RequestHeader("Authorization") String authorizationHeader) throws IOException {
        // Extract the user from the Authorization header
        String token = extractToken(authorizationHeader);
        User user = jwtDecodingService.saveUserDetailsFromToken(token);

        String input = new String(file.getBytes(), StandardCharsets.UTF_8);
        String convertedContent = transformationService.convert(input, fromFormat, toFormat);

        InputFile inputFile = new InputFile();
        inputFile.setFilename(file.getOriginalFilename());
        inputFile.setContent(input);
        inputFile.setInputType(fromFormat);
        inputFile.setOutputType(toFormat);
        inputFile.setTimestamp(LocalDateTime.now());
        inputFile.setUser(user); // Set the userId

        inputFile = inputFileRepository.save(inputFile);

        OutputFile outputFile = new OutputFile();
        outputFile.setTargetFormat(toFormat);
        outputFile.setConvertedContent(convertedContent);
        outputFile.setInputFile(inputFile);

        outputFileRepository.save(outputFile);

        return convertedContent;
    }

    @GetMapping("/history")
    public List<InputFile> getFileHistory(@RequestHeader("Authorization") String authorizationHeader) {
        // Extract the user from the Authorization header
        String token = extractToken(authorizationHeader);
        User user = jwtDecodingService.saveUserDetailsFromToken(token);
        if (user.getRole().equals("admin")) {
            return inputFileRepository.findAll(); // Admin sees all records
        } else {
            return inputFileRepository.findByUser(user); // Regular user sees only their records
        }
    }


    @GetMapping("/output/{id}")
    public OutputFile getOutputFile(@PathVariable Long id) {
        return outputFileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Output file not found"));
    }
}
