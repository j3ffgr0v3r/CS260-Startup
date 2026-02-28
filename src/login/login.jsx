import React from 'react';

import "./login.css";

import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';
import { AuthState } from './authState';

export function Login({ onAuthChange }) {
    const [loginUsername, setLoginUsername] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');
    const [createFirstName, setFirstName] = React.useState('');
    const [createLastName, setLastName] = React.useState('');
    const [formState, setFormState] = React.useState('login');
    const [displayError, setDisplayError] = React.useState(null);
    const [users, setUsers] = React.useState(() => {
        const saved = localStorage.getItem('users');
        return saved ? JSON.parse(saved) : [];
    });


    const navigate = useNavigate();


    async function authenticate(user) {
        localStorage.setItem('activeUser', JSON.stringify(user));
        onAuthChange(user, AuthState.Authenticated);
        navigate("/home");
    }

    async function loginUser() {
        setDisplayError(null);
        // Find user
        const match = users.find(user => user.username === loginUsername);
        if (match != undefined && match.password == loginPassword) {
            authenticate(match);
        } else {
            setDisplayError("Invalid login credentials.");
        }
    }

    async function beginCreateUser() {
        setDisplayError(null);
        const match = users.find(user => user.username === username);
        if (match != undefined) {
            setDisplayError("Error: Account found with given username. Please sign in.");
        } else {
            setFormState('create');
        }
    }

    async function createUser() {
        setDisplayError(null);

        const newUser = {
            username: loginUsername,
            password: loginPassword,
            firstName: createFirstName,
            lastName: createLastName,
            events: []
        }
        const usersUpdated = [...users, newUser]
        setUsers(usersUpdated);
        localStorage.setItem('users', JSON.stringify(usersUpdated));
        authenticate(newUser);

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
                    {formState == 'login' && (<>
                        <h2>What's your schedule looking like today?</h2>
                        <div className="m-3">
                            <input className="form-control" type="text" placeholder="Username" required value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
                        </div>
                        <div className="m-3">
                            <input className="form-control" type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} required />
                        </div>
                        {displayError && <div className="m-3 text-danger">{displayError}</div>}
                        <div className="login-buttons">
                            <Button className="m-2 btn" variant='primary' onClick={() => loginUser()} disabled={!loginUsername || !loginPassword}>Log In</Button>
                            <Button className="m-2 btn" variant='secondary' onClick={() => beginCreateUser()} disabled={!loginUsername || !loginPassword}>Create New Account</Button>
                        </div>
                    </>)
                    }
                    {formState == 'create' && (<>
                        <h2>Nice to meet you{(createFirstName.length > 0 ? ", " : "") + createFirstName}!</h2>
                        <div className="m-3">
                            <input className="form-control" type="text" placeholder="First Name" required value={createFirstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="m-3">
                            <input className="form-control" type="text" placeholder="Last Name" required value={createLastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        {displayError && <div className="m-3 text-danger">{displayError}</div>}
                        <div className="login-buttons">
                            <Button className="m-2 btn" variant='secondary' onClick={() => createUser()} disabled={!createUsername || !createFirstName || !createLastName}>Create Account</Button>
                        </div>
                    </>)
                    }
                </form>
            </div>
        </main>
    );
}