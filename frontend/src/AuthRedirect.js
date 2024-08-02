import React, { useEffect } from 'react';

const AuthRedirect = () => {
    useEffect(() => {
        // Redirect to the backend authentication endpoint
        window.location.href = 'http://localhost:8081';
    }, []);

    return (
        <div>
            <p>Redirecting to login...</p>
        </div>
    );
};

export default AuthRedirect;
