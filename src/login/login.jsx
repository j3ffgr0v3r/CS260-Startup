import React from 'react';

import "./login.css";

import { useNavigate } from 'react-router-dom';

export function Login() {
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
                        <input className="form-control" type="email" placeholder="Email" required />
                    </div>
                    <div className="m-3">
                        <input className="form-control" type="password" placeholder="Password" required />
                    </div>
                    <div className="login-buttons">
                        <button className="m-2 btn btn-primary" type="submit" onClick={useNavigate("/home")}>Log In</button>
                        <button className="m-2 btn btn-secondary" type="submit" onClick={useNavigate("/home")}>Create New Account</button>
                    </div>
                </form>
            </div>
        </main>
    );
}