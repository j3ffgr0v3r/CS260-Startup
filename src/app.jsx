import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
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

                {/* <!-- Navigation elements --> */}
                <nav className="navbar navbar-expand-lg bg-white pt-0">
                    {/* <!-- Menu is a semantic alternative to <ul> that represents an interaction --> */}
                    <menu className="navbar-nav mt-0">
                        <li className="nav-item"><a className="nav-link active" href="home.html">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="friends.html">Friends</a></li>
                        <li className="nav-item"><a className="nav-link" href="about.html">About</a></li>
                    </menu>
                </nav>
            </header>

            <main className="m-1">App content</main>

            <footer className="border-top bg-light py-1 px-2">
                <div>Jeff Grover</div>
                <div><a href="https://github.com/j3ffgr0v3r/CS260-Startup">GitHub</a></div>
            </footer>
        </div>
    );
}