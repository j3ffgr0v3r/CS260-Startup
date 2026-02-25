import React from 'react';

import "./login.css";

import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';
import { AuthState } from './authState';

export function Login({ onAuthChange }) {
    const [loginEmail, setLoginEmail] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    const navigate = useNavigate();

    async function loginUser() {
        localStorage.setItem('userEmail', loginEmail);
        localStorage.setItem('username', loginEmail);
        onAuthChange(loginEmail, loginEmail, AuthState.Authenticated);
        navigate("/home");
    }

    async function createUser() {
        // TODO - User Creation Logic
        loginUser();
    }

    return (
        <main className="login-content">
            <img className="background-logo" src="./images/logo.svg" />
            <div className="login-logo">
                <h1 className="wys-name px-3 py-2 text-primary border-bottom">What's Your Schedule?</h1>
                <h3 className="wys-motto px-3 text-secondary">Plan with friends, easier than ever.</h3>
            </div>
            <div className="login-interface">
                <form method="get" action="/home" className="login-form mx-3 px-4 py-3 bg-light bg-opacity-50 border rounded">
                    <h2>What's your schedule looking like today?</h2>
                    <div className="m-3">
                        <input className="form-control" type="email" placeholder="Email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>
                    <div className="m-3">
                        <input className="form-control" type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} required />
                    </div>
                    <div className="login-buttons">
                        <Button className="m-2 btn" variant='primary' onClick={() => loginUser()} disabled={!loginEmail || !loginPassword}>Log In</Button>
                        <Button className="m-2 btn" variant='secondary' onClick={() => createUser()} disabled={!loginEmail || !loginPassword}>Create New Account</Button>
                    </div>
                </form>
            </div>
        </main>
    );
}