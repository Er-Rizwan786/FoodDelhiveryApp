// src/SignIn.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from './context'; 
import './SignIn.css';

const SignIn = ({ onSwitchToRegister }) => {
  // Destructure `closeSignInPanel` from the useApp hook
  const { login, closeSignInPanel } = useApp(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      // Pass the username to the login function
      login({ name: username });
      
      // Close the side panel before navigating
      closeSignInPanel();
      
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign In</h2>
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
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            className="signin-input"
          />
        </div>
        <button type="submit" className="signin-button">Sign In</button>
      </form>
      <div className="switch-form-link">
        <p>
          New user?{' '}
          <span onClick={onSwitchToRegister} className="switch-link">
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;