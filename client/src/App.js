import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './login/LoginForm';
import { Container, Grid, Button } from '@mui/material';
import Menu from './components/Navbar';
import TiendaForm from './interface/TiendaForm';

function AdminView() {
  return (
    <div>
      <h2>Menu</h2>
      <Link to="/tasks">
        <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Ver productos
        </Button>
      </Link>
      <Link to="/new-task">
        <Button variant="contained" color="secondary">
          ingresar Producto
        </Button>
      </Link>
    </div>
  );
}

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button variant="outlined" color="primary" onClick={() => navigate('/admin')} style={{ marginTop: '20px' }}>
      Volver 
    </Button>
  );
}

function TaskListWithBackButton() {
  return (
    <div>
      <TaskList />
      <BackButton />
    </div>
  );
}

function TaskFormWithBackButton() {
  return (
    <div>
      <TaskForm />
      <BackButton />
    </div>
  );
}

function AuthenticatedApp({ userType }) {
  return (
    <>
      <Menu />
      <Container>
        <Routes>
          <Route path="/admin" element={userType === 'admin' ? <AdminView /> : <Navigate to="/" />} />
          <Route path="/tasks" element={<TaskListWithBackButton />} />
          <Route path="/new-task" element={<TaskFormWithBackButton />} />
          <Route path="/tienda" element={userType === 'bruno' ? <TiendaForm /> : <Navigate to="/" />} />
          <Route path="/" element={<Navigate to={userType === 'admin' ? '/admin' : '/tienda'} />} />
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
      navigate('/admin');
    } else if (username === "bruno" && password === "12345") {
      setIsAuthenticated(true);
      setUserType('bruno');
      navigate('/tienda');
    } else {
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