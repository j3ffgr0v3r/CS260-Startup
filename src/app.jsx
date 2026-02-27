import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, Navigate, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Friends } from './friends/friends';
import { FriendSchedule } from './friend_schedule/friend_schedule';
import { About } from './about/about';
import { AuthState } from './login/authState';
import { ResetDatabase } from './components/debug';
import { Button } from 'react-bootstrap';

export default function App() {
    const [username, setUsername] = React.useState(localStorage.getItem('username') || '');
    const [userEmail, setUserEmail] = React.useState(localStorage.getItem('userEmail') || '');
    const [authState, setAuthState] = React.useState(userEmail ? AuthState.Authenticated : AuthState.Unauthenticated);

    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route element={<PublicRoute authState={authState}/>}>
                        <Route path='/' element={<Login userEmail={userEmail}
                                            onAuthChange={(username, userEmail, authState) => {
                                            setUsername(username);
                                            setUserEmail(userEmail);
                                            setAuthState(authState);
                                            }}/>} exact />
                    </Route>
                    <Route element={<PrivateRoute authState={authState} />}>
                        <Route element={<Header username={username} />}>
                            <Route path='/home' element={<Home username={username} />} />
                            <Route path='/friends/:friendID' element={<FriendSchedule />} />
                            <Route path='/friends' element={<Friends />} />
                            {/* <Route path='/friend_schedule' element={<FriendSchedule />} /> */}
                            <Route path='/about' element={<About />} />
                        </Route> 
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className="border-top bg-light py-1 px-2">
                    <div>Jeff Grover</div>
                    <Button onClick={ResetDatabase}>Reset Database</Button>
                    <div><a href="https://github.com/j3ffgr0v3r/CS260-Startup">GitHub</a></div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function Header({ username }) {
    return (
        <>
            <header className="bg-white">
                <div className="top">
                    <div className="title">
                        <h1 className="text-primary mb-0"><img className="logo" src="images/logo.svg" alt="logo" />What's Your Schedule?</h1>
                    </div>
                    <div className="profile me-3">
                        <span>{username}</span><img className="profile-symbol" src="images/profile.svg" alt="profile" />
                    </div>
                </div>

                <nav className="navbar navbar-expand-lg bg-white pt-0">
                    <menu className="navbar-nav mt-0">
                        <li className="nav-item"><NavLink className="nav-link" to="home">Home</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="friends">Friends</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="about">About</NavLink></li>
                    </menu>
                </nav>
            </header>
            <Outlet />
        </>
    );
}

function PublicRoute ({ authState }) {
    // If user exists, redirect them to home instead of showing Login/Landing
    return authState == AuthState.Authenticated ? (<Navigate to="/home" replace />) : (<Outlet />);
};

function PrivateRoute ({ authState }) {
    // If user does not exist, redirect them to Login
    return authState != AuthState.Authenticated ? (<Navigate to="/" replace />) : (<Outlet />);
    
};

export function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}