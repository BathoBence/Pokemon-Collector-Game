import React from "react";
import { useState } from 'react';
import Cookies from "js-cookie";

import './LoginPage.css';
import LoginForm from '../../Forms/LoginForm';
import {useNavigate} from "react-router-dom"; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (loginResponse.ok) {
                const result = await loginResponse.json();
                const token = result.jwt;
                Cookies.set('accessToken', token, { secure: true });
                navigate(`/main/${result.user}`);
            }

        } catch (error) {
            console.error(error); // Handle fetch error
        }
    }
    return <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onLogin={handleLogin} />;
}

export default LoginPage;