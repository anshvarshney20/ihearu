import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, { email, password });

            const data = response.data;
            localStorage.setItem('access', data.results.token);
            setUser(data.results.verifyAdmin);
            setIsLoggedIn(true);
            // navigate('/dashboard');
            console.log(data)
            console.log('API Response:', data.message);
            if (data.error) {
                setMessage('Invalid Email')

            }
            else {
                navigate('/dashboard')
            }
        } catch (error) {
            console.error('Error during API request:', error);
            // Handle other errors, e.g., show a general error message to the user
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('access');
        setUser({});
        setIsLoggedIn(false);
        navigate('/'); // or navigate to the homepage
    };

    const forgotPassword = async (email) => {
        setIsLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/forgetPassword`, { email });
            const data = response.data;
            console.log('Password reset email sent successfully:', data);
            localStorage.setItem("useremail", email);
            if (data.error) {
                setMessage('Email Not Found')
            }
            else {
                navigate('/verification')
            }
        } catch (error) {
            console.error('Error during API request:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const verification = async (email, otp) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/verifyOtp`, { email, otp });
            const data = response.data;
            console.log(data.message);

            if (data.error) {
                alert("Invalid OTP");
            } else {
                console.log("OTP Verified Successfully");
                navigate('/reset-password');
            }
        } catch (error) {
            console.error("Error during verification:", error.message);
        } finally {
            setIsLoading(false);
        }
    };
    const reset_password = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/updatePassword`, { email, password });

            const data = response.data;
            console.log('API Response:', data.message);
            if (data.error) {
                setError(error)
                alert(error)
            }
            else {
                navigate('/')
            }
        } catch (error) {
            console.error('Error during API request:', error);
            // Handle other errors, e.g., show a general error message to the user
        } finally {
            setIsLoading(false);
        }
    }
    const change_password = async (email, oldPassword, newPassword) => {
        setIsLoading(true);
        try {
            const authToken = localStorage.getItem('access');
            if (!authToken) {
                throw new Error('Authentication token not found');
            }

            const headers = {
                'x-auth-token-admin': authToken,
                'Content-Type': 'application/json',
            };

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/admin/changePassword`,
                { email, oldPassword, newPassword },
                { headers }
            );

            const data = response.data;
            console.log('API Response:', data.message);
            if (data.error) {
                setError(data.error); // Set the error from the API response
                alert(data.error); // Show the error to the user
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error during API request:', error);
            // Handle other errors, e.g., show a general error message to the user
        } finally {
            setIsLoading(false);
        }
    };
    const request_again = async (email) => {
        setIsLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/forgetPassword`, { email });
            const data = response.data;
            console.log('Password reset email sent successfully:', data);
            if (data.error) {
                setMessage('Email Not Found')
            }
            else {
                navigate('/verification')
            }
        } catch (error) {
            console.error('Error during API request:', error);
        } finally {
            setIsLoading(false);
        }

    }
    return (
        <userAuthContext.Provider value={{ login, logout, forgotPassword, verification, reset_password, change_password, request_again,message, user, error, isLoggedIn, isLoading }}>
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}
