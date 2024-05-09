import { useState } from 'react';
import Cookies from "js-cookie";

import './LoginPage.css'
import LoginForm from '../../Forms/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    password,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                const token = result.jwt;
                Cookies.set('accessToken', token, { secure: true });
                navigate("/");
            }

        } catch (error) {
            console.error(error); // Handle fetch error
        }
    }

    return <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onLogin={handleLogin} />
}

export default LoginPage;