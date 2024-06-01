// src/App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useColorMode, Button } from '@chakra-ui/react';
import LoginPage from './components/LoginPage';
import OrdersPage from './pages/OrdersPage';
import useAuth from './hooks/useAuth';
import EditOrderModal from './components/EditOrderModal';

function App() {
  const { toggleColorMode } = useColorMode();
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Button onClick={toggleColorMode} position="absolute" top={4} right={4}>
        Toggle Theme
      </Button>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/orders" element={isAuthenticated ? <OrdersPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
