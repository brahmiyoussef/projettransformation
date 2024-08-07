// src/keycloak.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080/auth',
    realm: 'demo-realm',
    clientId: 'demo-client'
});

export default keycloak;
