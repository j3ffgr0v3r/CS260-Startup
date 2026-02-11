import React from 'react';

// import "./login.css";

export function Login() {
    return (
        <main>
            <img className="background-logo" src="./images/logo.svg"></img>
            <form method="get" action="home.html" className="login-form mx-3 px-4 py-3 bg-light bg-opacity-50 border rounded">
                <h2>What's your schedule looking like today?</h2>
                <div className="m-3">
                    <input className="form-control" type="email" placeholder="Email" required />
                </div>
                <div className="m-3">
                    <input className="form-control" type="password" placeholder="Password" required />
                </div>
                <div className="login-buttons">
                    <button className="m-2 btn btn-primary" type="submit">Log In</button>
                    <button className="m-2 btn btn-secondary" type="submit">Create New Account</button>
                </div>
            </form>
        </main>
    );
}