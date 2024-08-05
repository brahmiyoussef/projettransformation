import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProtectedPage = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/home');
                setMessage(response.data);
            } catch (error) {
                console.error('Error fetching protected message:', error);
            }
        })(); // IIFE to handle async call

    }, []); // Empty dependency array means this effect runs once after the initial render.

    return (
        <div>
            <h1>Protected Page</h1>
            <p>{message}</p>
        </div>
    );
};

export default ProtectedPage;
