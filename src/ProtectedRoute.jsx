import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const useAuth = () =>{
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    const isAuthenticated = !!storedUsername && !!storedPassword;

    return isAuthenticated;

}

export const ProtectedRoute = () => {
    const isAuth = useAuth();
  return isAuth ? <Outlet/> : <Navigate to='/'/>
}
