package com.backend.domain.services;


import com.backend.infrastructure.postgres.entities.User;
import com.backend.infrastructure.postgres.repositories.UserRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JwtDecodingService {

    @Autowired
    private UserRepository userDetailsRepository;

    // Decodes Base64Url without external libraries
    private String base64UrlDecode(String base64Url) {
        String base64 = base64Url.replace('-', '+').replace('_', '/');
        int padding = base64.length() % 4;
        if (padding > 0) {
            base64 += "====".substring(padding);
        }
        byte[] decodedBytes = Base64.getDecoder().decode(base64);
        return new String(decodedBytes);
    }

    // Parses JWT token and returns payload as JSON object
    private JSONObject parseToken(String token) {
        String[] parts = token.split("\\.");
        if (parts.length != 3) {
            throw new IllegalArgumentException("JWT does not have 3 parts");
        }
        String payload = base64UrlDecode(parts[1]);
        return new JSONObject(payload);
    }

    // Maps JWT payload to UserDetails object and saves it to the database
    public User saveUserDetailsFromToken(String token) {
        JSONObject payloadJson = parseToken(token);

        String username = payloadJson.optString("preferred_username");

        // Check if user already exists by username
        Optional<User> existingUser = userDetailsRepository.findByUsername(username);

        if (existingUser.isPresent()) {
            // If the user already exists, do not save and return the existing user
            return existingUser.orElse(null);
        }
        User userDetails = new User();
        userDetails.setName(payloadJson.optString("name"));
        userDetails.setUsername(payloadJson.optString("preferred_username"));
        userDetails.setGivenName(payloadJson.optString("given_name"));
        userDetails.setFamilyName(payloadJson.optString("family_name"));
        userDetails.setEmail(payloadJson.optString("email"));

        // Determine user role from resource_access
        String userRole = null;
        if (payloadJson.has("resource_access")) {
            JSONObject resourceAccess = payloadJson.getJSONObject("resource_access");
            Iterator<String> keys = resourceAccess.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                JSONObject resource = resourceAccess.getJSONObject(key);
                if (resource.has("roles")) {
                    JSONArray rolesArray = resource.getJSONArray("roles");
                    Set<String> resourceRoles = new HashSet<>();
                    for (int i = 0; i < rolesArray.length(); i++) {
                        resourceRoles.add(rolesArray.getString(i));
                    }
                    if (resourceRoles.contains("admin")) {
                        userRole = "admin";
                        break;
                    } else if (resourceRoles.contains("user")) {
                        userRole = "user";
                        break;
                    }
                }
            }

            // Set the determined role
            if (userRole != null) {
                userDetails.setRole(userRole);
            }

            // Save to the database

        }
        return userDetailsRepository.save(userDetails);
    }
}
