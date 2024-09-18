import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './login/LoginForm';
import { Container } from '@mui/material';
import Menu from './components/Navbar';
import TiendaForm from './interface/TiendaForm';

function AuthenticatedApp({ userType }) {
  return (
    <>
      <Menu />
      <Container>
        <Routes>
          <Route path="/tienda" element={<TiendaForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/create-task" element={<TaskForm />} />
          <Route path="*" element={<Navigate to={userType === 'admin' ? '/tasks' : '/tienda'} replace />} />
        </Routes>
      </Container>
    </>
  );
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "12345") {
      setIsAuthenticated(true);
      setUserType('admin');
      navigate('/tasks');
    } else if (username === "bruno" && password === "12345") {
      setIsAuthenticated(true);
      setUserType('bruno');
      navigate('/tienda');
    } else {
      // Handle invalid login
      alert("Invalid username or password");
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <AuthenticatedApp userType={userType} />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}