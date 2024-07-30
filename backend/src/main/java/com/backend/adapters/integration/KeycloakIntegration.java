package com.backend.adapters.integration;

import org.keycloak.KeycloakSecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class KeycloakIntegration {

    public String getCurrentUsername() {
        KeycloakSecurityContext keycloakSecurityContext = (KeycloakSecurityContext) SecurityContextHolder
                .getContext().getAuthentication().getDetails();
        return keycloakSecurityContext.getIdToken().getPreferredUsername();
    }


}
