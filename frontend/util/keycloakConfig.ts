

const keycloakConfig = {
    baseUrl: 'http://localhost:8080', 
    realm: 'demo-realm',
    clientId: 'demo-client',
    redirectUri: 'http://localhost:3000/login', 
  };
  
export const getTokenEndpoint = () => `${keycloakConfig.baseUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`;
export const getLogoutEndpoint = () => `${keycloakConfig.baseUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/logout`;

  
  export { keycloakConfig as default };
  