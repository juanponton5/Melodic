import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate, Link } from 'react-router-dom';
import { Container, Button } from '@mui/material';

import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './login/LoginForm';
import Menu from './components/Navbar';
import TiendaForm from './interface/TiendaForm';
import PercuForm from './menu/percusion/PercuForm';
import VientosForm from './menu/vientos/VientosForm';
import CuerdasForm from './menu/cuerdas/CuerdasForm'; 
import CarritoPage from './carrito/CarritoPage';

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
        <Button variant="contained" color="secondary" style={{ marginRight: '10px' }}>
          Ingresar Producto
        </Button>
      </Link>
      <Link to="/carrito">
        <Button variant="contained" color="success" style={{ marginRight: '10px' }}>
          Ir al Carrito
        </Button>
      </Link>
      <Link to="/menu/vientos">
        <Button variant="contained" color="info" style={{ marginRight: '10px' }}>
          Instrumentos de Viento
        </Button>
      </Link>
      <Link to="/menu/cuerdas">
        <Button variant="contained" color="warning" style={{ marginRight: '10px' }}>
          Instrumentos de Cuerda
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
          <Route path="/menu/PercuForm" element={<PercuForm />} />
          <Route path="/menu/vientos" element={<VientosForm />} />
          <Route path="/menu/cuerdas" element={<CuerdasForm />} /> {}
          <Route path="/carrito" element={<CarritoPage />} />
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