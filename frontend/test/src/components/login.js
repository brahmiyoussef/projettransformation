// src/Login.js
import React, { useEffect, useState } from 'react';
import keycloak from '../Services/AuthService';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      if (authenticated) {
        history.push('/'); // Redirect to home or other protected route
      } else {
        setLoading(false);
      }
    }).catch(() => {
      setLoading(false);
    });
  }, [history]);

  const handleLogin = () => {
    keycloak.login();
  };

  const handleLogout = () => {
    keycloak.logout();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {keycloak.authenticated ? (
        <div>
          <p>Welcome, {keycloak.tokenParsed.preferred_username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Please log in</h2>
          <button onClick={handleLogin}>Login with Keycloak</button>
        </div>
      )}
    </div>
  );
};

export default Login;
