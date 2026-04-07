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
import { ToastProvider } from './components/toast';
import { Button, Dropdown } from 'react-bootstrap';
import { LiveNotifier } from './liveNotifier';

export default function App() {
    const [authState, setAuthState] = React.useState(localStorage.getItem('username') ? AuthState.Authenticated : AuthState.Unauthenticated);

    // Get active user
    const [activeUser, setActiveUser] = React.useState(null);
    React.useEffect(() => {
        const fetchUser = async () => {
            if (authState !== AuthState.Authenticated) return;
            const response = await fetch(`/api/users/${localStorage.getItem('username')}`);
            if (response.status === 401) {
                localStorage.removeItem("username");
                setAuthState(AuthState.Unauthenticated);
            } else {
                response.json().then((user) => {
                    setActiveUser(user);
                });
            }
        };
        fetchUser();

    }, [authState]);

    const [friends, setFriends] = React.useState([]);
    React.useEffect(() => {
        if (authState !== AuthState.Authenticated) return;
        fetch('/api/friends')
            .then((response) => response.json())
            .then((friendsList) => {
                setFriends(Array.isArray(friendsList) ? friendsList : []);
            });
    }, [authState]);
    const [friendRequests, setFriendRequests] = React.useState([]);
    React.useEffect(() => {
        if (authState !== AuthState.Authenticated) return;
        fetch('/api/friendRequests')
            .then((response) => response.json())
            .then((friendRequestsList) => {
                setFriendRequests(Array.isArray(friendRequestsList) ? friendRequestsList : []);
            });
    }, [authState]);

    React.useEffect(() => {
        LiveNotifier.addHandler(handleNewNotification);

        return () => {
            LiveNotifier.removeHandler(handleNewNotification);
        };
    }, []);


    function handleNewNotification(notification) {
        switch (notification.type) {
            case 'new_friend_request':
                setFriendRequests((current) => [...current, notification.from]);
                // setToasts((current) => [...current, ...]);
                break;
            case 'new_event_invite':
                setEventInvites((current) => [...current, notification.payload]);
                break;
        }
    }

    return (
        <ToastProvider>
            <BrowserRouter>
                <div className="app">
                    <Routes>
                        <Route element={<PublicRoute authState={authState} />}>
                            <Route path='/' element={<Login onAuthChange={(activeUser, authState) => {
                                setActiveUser(activeUser);
                                setAuthState(authState);
                            }} />} exact />
                        </Route>
                        <Route element={<PrivateRoute authState={authState} />}>

                            <Route element={<Header activeUser={activeUser} setActiveUser={setActiveUser} setAuthState={setAuthState} />}>
                                <Route path='/home' element={<Home activeUser={activeUser} friends={friends} />} />
                                <Route path='/friends/:friendID' element={<FriendSchedule friends={friends} setFriends={setFriends} />} />
                                <Route path='/friends' element={<Friends friends={friends} setFriends={setFriends} friendRequests={friendRequests} setFriendRequests={setFriendRequests} />} />
                                <Route path='/about' element={<About />} />
                            </Route>

                        </Route>
                        <Route path='*' element={<NotFound />} />
                    </Routes>

                    <footer className="border-top bg-light py-1 px-2">
                        <div>Jeff Grover</div>
                        <Button onClick={() => fetch('/api/resetDB', {
                            method: 'post',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        })}>Reset Database</Button>
                        <div><a href="https://github.com/j3ffgr0v3r/CS260-Startup">GitHub</a></div>
                    </footer>
                </div>
            </BrowserRouter>
        </ToastProvider>
    );
}

function Header({ activeUser, setActiveUser, setAuthState }) {
    function logout() {
        fetch('/api/auth/logout', {
            method: 'delete',
        });
        setActiveUser(null);
        localStorage.removeItem("username");
        setAuthState(AuthState.Unauthenticated);
        <Navigate to="/" replace />;
    }

    return (
        <>
            <header className="bg-white">
                <div className="top">
                    <div className="title">
                        <h1 className="text-primary mb-0"><img className="logo" src="/images/logo.svg" alt="logo" />What's Your Schedule?</h1>
                    </div>
                    <div className="profile me-3">
                        <ProfileMenu activeUser={activeUser} onLogout={logout} />
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

// Custom toggle to use an SVG instead of default caret
const IconToggle = React.forwardRef(({ username, onClick }, ref) => (
    <button
        ref={ref}
        type="button"
        className="btn p-1 border-0"
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        aria-label="Open profile menu"
    >
        <span>{username}</span><img className="profile-symbol" src="/images/profile.svg" alt="profile" />
    </button>
));

function ProfileMenu({ activeUser, onLogout }) {
    return (
        <Dropdown align="end">
            <Dropdown.Toggle username={activeUser?.username} as={IconToggle} id="profile-menu" />

            <Dropdown.Menu>
                <Dropdown.Item onClick={onLogout}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function PublicRoute({ authState }) {
    // If user exists, redirect them to home instead of showing Login/Landing
    return authState == AuthState.Authenticated ? (<Navigate to="/home" replace />) : (<Outlet />);
};

function PrivateRoute({ authState }) {
    // If user does not exist, redirect them to Login
    return authState != AuthState.Authenticated ? (<Navigate to="/" replace />) : (<Outlet />);

};

export function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}