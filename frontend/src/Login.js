import React, { useState } from 'react';
import axios from 'axios';

const VerifyToken = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [verificationResult, setVerificationResult] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const params = new URLSearchParams();
            params.append('client_id', 'demo-client');
            params.append('username', username);
            params.append('password', password);
            params.append('grant_type', 'password');

            const response = await axios.post('http://localhost:8080/realms/demo-realm/protocol/openid-connect/token', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            setToken(response.data.access_token);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const handleVerify = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/verify', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setVerificationResult(response.data);
        } catch (error) {
            console.error('Verification failed', error);
            setVerificationResult('Verification failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            {token && (
                <div>
                    <h3>Access Token:</h3>
                    <pre>{token}</pre>
                    <button onClick={handleVerify}>Verify Token</button>
                </div>
            )}
            {verificationResult && (
                <div>
                    <h3>Verification Result:</h3>
                    <pre>{verificationResult}</pre>
                </div>
            )}
        </div>
    );
};

export default VerifyToken;
