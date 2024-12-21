import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Header';


interface PrivateRouterProps {
  children: React.ReactNode;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
  const tokenKey = "token";
  const isAuthenticated = () => localStorage.getItem(tokenKey) !== null;

  return isAuthenticated() ? (
    <Header>{children}</Header>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRouter;
