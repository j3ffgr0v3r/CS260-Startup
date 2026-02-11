import React from 'react';
import { NavLink } from 'react-router-dom';

export function About() {
  return (
    <main className="p-3">
      <h2 className="bg-secondary p-4">"When are you guys available?"</h2>
      <hr />
      <p>A question of the past. Stop wasting time coordinating for an activity, and start spending more time having fun! With <i>What's Your Schedule?</i> you can easily find mutual availability with friends and send invites to activities— Game Nights, Movie Nights, Service Projects, Campus Activities and more!</p>

      <p>To get started, set your availability on the <NavLink to="../home">home page</NavLink> and start connecting with your <NavLink to="../friends">friends</NavLink>.</p>
    </main>
  );
}