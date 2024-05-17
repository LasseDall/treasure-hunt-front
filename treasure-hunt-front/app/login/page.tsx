'use client'

import { useState, ChangeEvent } from 'react';
import { login } from '../lib/data';
import { ToastContainer } from 'react-toastify';
import styles from '../ui/home.module.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: ChangeEvent<{ value: unknown }>) => {
        setUsername(event.target.value as string);
    };

    const handlePasswordChange = (event: ChangeEvent<{ value: unknown }>) => {
        setPassword(event.target.value as string);
    };

    const handleLogin = () => {
        login(username, password);
    };

    return (
        <main>
            <ToastContainer />
            <h1>Login</h1>
                <div>
                    <label htmlFor="username">Brugernavn:</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={handleUsernameChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Adgangskode:</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        required 
                    />
                </div>
                <button className={styles.button} onClick={handleLogin}>Login</button>
        </main>
    );
}