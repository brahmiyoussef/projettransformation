import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Importez le CSS spécifique à la page de connexion

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('client_id', 'test2');
      params.append('username', username);
      params.append('password', password);
      params.append('grant_type', 'password');

      const response = await axios.post('http://localhost:8080/realms/test2/protocol/openid-connect/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const accessToken = response.data.access_token;
      
      Cookies.set('authToken', accessToken);
      await axios.post(
        '/api/convert/login',
        null, // No request body needed
        {
          headers: {
            'Authorization': `Bearer ${accessToken}` // Include token in the Authorization header
          },
          withCredentials: true // Include credentials if necessary
        }
      );
      login(); // Met à jour l'état d'authentification
      navigate('/'); // Redirige vers la page d'accueil
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="mb-4">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
