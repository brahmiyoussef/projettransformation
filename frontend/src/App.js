import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthRedirect from './AuthRedirect';
import Dashboard from './Dashboard';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is authenticated and update state
        const token =4// Example token check
        if (token) {
            setAuthenticated(true);
        }
    }, []);

    return (
        <div>

                <AuthRedirect />

        </div>
    );
};

export default App;
