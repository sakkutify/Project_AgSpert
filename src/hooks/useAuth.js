// src/hooks/useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('isAuthenticated'));
  });
  const navigate = useNavigate();

  const login = (username, password) => {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      navigate('/orders');
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;
