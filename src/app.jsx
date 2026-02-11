import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Friends } from './friends/friends';
import { FriendSchedule } from './friend_schedule/friend_schedule';
import { About } from './about/about';

export default function App() {
    return (
        <BrowserRouter>
            <div className="body bg-light text-dark">
                <header className="bg-white">
                    <div className="top">
                        <div className="title">
                            <h1 className="text-primary mb-0"><img className="logo" src="images/logo.svg" alt="logo" />What's Your Schedule?</h1>
                        </div>
                        <div className="profile me-3">
                            <span>Username</span><img className="profile-symbol" src="images/profile.svg" alt="profile" />
                        </div>
                    </div>

                    <nav className="navbar navbar-expand-lg bg-white pt-0">
                        <menu className="navbar-nav mt-0">
                            <li className="nav-item"><NavLink className="nav-link active" to="home">Home</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="friends">Friends</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="about">About</NavLink></li>
                        </menu>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/home' element={<Home />} />
                    <Route path='/friends' element={<Friends />} />
                    <Route path='/friend_schedule' element={<FriendSchedule />} />
                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className="border-top bg-light py-1 px-2">
                    <div>Jeff Grover</div>
                    <div><a href="https://github.com/j3ffgr0v3r/CS260-Startup">GitHub</a></div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}