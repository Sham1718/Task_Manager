import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'

const ProtectedRoute = ({children}) => {
    const {isAuthenticate} =useAuth();
  if(!isAuthenticate){
    // console.log("ProtectedRoute auth:", isAuthenticate);
    return <Navigate to="/" replace/>
    

  }

  return children;
}

export default ProtectedRoute
