import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    const toten = loginInfo.token;
    return (
        toten ? <Outlet /> : <Navigate to='/' />
    )
}

export default ProtectedRoutes