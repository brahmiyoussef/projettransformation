import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchTokenAndData = async () => {
            try {
                // Get the token from the cookie
                const token = Cookies.get('accessToken');
                console.log('TOKEN IN CONSOLE LOG:', token); // Log the token to verify

                if (token) {
                    // Fetch the protected data using the token
                    const dataResponse = await axios.get('http://localhost:8081/home', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        withCredentials: true  // Ensure this line is present
                    });

                    setData(dataResponse.data);
                } else {
                    console.error('No token found, redirecting to login...');
                    // Optionally redirect to login page if no token is found

                }
            } catch (error) {
                console.error('There was an error fetching the token or data!', error);
            }
        };

        fetchTokenAndData().catch(error => console.error('Error in fetchTokenAndData:', error));
    }, []);

    return (
        <div>
            <h1>Welcome to the Dashboard!</h1>
            {data ? (
                <div>
                    <p>{JSON.stringify(data)}</p>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default Dashboard;
