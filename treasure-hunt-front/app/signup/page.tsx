'use client'

import { useState, ChangeEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { signup } from '../lib/data'; 
import styles from '../ui/home.module.css'; 

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handlePasswordCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(event.target.value);
    };

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSignup = () => {
        if (password === passwordCheck && password.length > 6 && name.length > 1 && email.length > 5 && phone.length > 7 && username.length > 1) {
            signup(name, email, phone, username, password);
        } else {
            toast.error('Somethings missing' + name + email + phone + username + password);
        }
    };

    return (
        <main className={styles.centerMain}>
            <ToastContainer />
            <div className={styles.loginDiv}>
                <h1 className={styles.title}>Sign Up</h1>
                <div>
                    <label className={styles.label} htmlFor="name">Name:</label>
                    <input 
                        className={styles.input}
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={handleNameChange} 
                        required 
                    />
                </div>
                <div>
                    <label className={styles.label} htmlFor="email">Email:</label>
                    <input 
                        className={styles.input}
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        required 
                    />
                </div>
                <div>
                    <label className={styles.label} htmlFor="phone">Phone:</label>
                    <input 
                        className={styles.input}
                        type="tel" 
                        id="phone" 
                        value={phone} 
                        onChange={handlePhoneChange} 
                        required 
                    />
                </div>
                <div>
                    <label className={styles.label} htmlFor="username">Username:</label>
                    <input 
                        className={styles.input}
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={handleUsernameChange} 
                        required 
                    />
                </div>
                <div>
                    <label className={styles.label} htmlFor="password">Password:</label>
                    <input 
                        className={styles.input}
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        required 
                    />
                </div>
                <div>
                    <label className={styles.label} htmlFor="password">Repeat password:</label>
                    <input 
                        className={styles.input}
                        type="password" 
                        id="password" 
                        value={passwordCheck} 
                        onChange={handlePasswordCheckChange} 
                        required 
                    />
                </div>
                <button className={styles.button} onClick={handleSignup}>Sign Up</button>
            </div>
            <div className={styles.linkDiv}>
                <a href='/login' className={styles.link}>Allerede medlem? Login</a>
            </div>
        </main>
    );
}