import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'

import Login from "../pages/LogInRegister";
import HomeRouter from './HomeRouter';



const AppRouter = (store) => {
    const estado = useSelector((state) => state);
    console.log(estado.auth.userGet)
    return (
        <BrowserRouter>
                <Routes>
                    <Route exact path="/*" element={!estado.auth.email ? <Navigate to="/login"/> : <HomeRouter />} />
                    <Route path="/login" element={estado.auth.email ? <Navigate to="/"/> : <Login isLogin={true} />} />
                    <Route path="/register" element={estado.auth.email ? <Navigate to="/"/> : <Login isLogin={false} />} />                
                </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
