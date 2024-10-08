import React, { useState } from "react";
import './LoginForm.css';
import { FaUserCircle, FaLock } from "react-icons/fa";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      if ((username === "admin" && password === "12345") ||
          (username === "bruno" && password === "12345")) {
        onLogin(username, password);
      } else {
        setError("Usuario o contraseña incorrectos");
        setUsername(""); // Clear username field
        setPassword(""); // Clear password field
      }
    } else {
      setError("Por favor, llena todos los campos");
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUserCircle className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon"/>
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="remember-forgot">
            <label><input type="checkbox"/> Acuérdate de mí </label>
            <a href="#"> ¿Olvidaste contraseña? </a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p> ¿No tienes una cuenta? <a href="#"> Registrarse</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;