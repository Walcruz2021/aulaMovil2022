import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from '../pages/Profile.jsx';

const UserRouter = () => {
    return (
        <Routes>
            <Route path="/profile/:id" element={<Profile />} />
        </Routes>
    );
}

export default UserRouter;
