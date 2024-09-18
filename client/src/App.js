import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './login/LoginForm';
import { Container } from '@mui/material';
import Menu from './components/Navbar';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <div>
        {!isAuthenticated ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <>
            <Menu />
            <Container>
              <Routes>
                <Route path='/' element={<TaskList />} />
                <Route path='/tasks/new' element={<TaskForm />} />
                <Route path='/tasks/:id/edit' element={<TaskForm />} />
                <Route path='*' element={<Navigate to="/" replace />} />
              </Routes>
            </Container>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}