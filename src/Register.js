// src/Register.js

import React, { useState } from 'react';
import { useApp } from './context';
import './SignIn.css'; // Re-use the same styles for consistency

// Pass onSwitchToSignIn as a prop
const Register = ({ onSwitchToSignIn }) => {
  const { login } = useApp();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && email && password) {
      // Here you would typically send data to a backend API to create the user
      // For now, we'll just log them in directly
      console.log('Registering new user:', { username, email, password });
      login();
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Register</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signin-input"
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signin-input"
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signin-input"
          />
        </div>
        <button type="submit" className="signin-button">
          Register
        </button>
      </form>
      <div className="switch-form-link">
        <p>
          Already have an account?{' '}
          <span onClick={onSwitchToSignIn} className="switch-link">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;