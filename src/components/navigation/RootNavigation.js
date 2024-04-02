import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../navbar/navbar'; 
import Login from '../../pages/login';
import Register from '../../pages/signup';
import HomePage from '../../pages/homepage';
import UserProfile from '../../pages/UserProfile'

export default function RootNavigation() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<HomePage />} /> {/* Explicit home route */}
        <Route path="/profile" element={<UserProfile />} /> {/* Add this line for UserProfile */}
      </Routes>
    </>
  );
}
