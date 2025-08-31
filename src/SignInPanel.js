// src/SignInPanel.js

import React, { useState } from 'react';
import { useApp } from './context';
import SignIn from './SignIn';
import Register from './Register';
import './SignInPanel.css';

const SignInPanel = () => {
  const { isSignInPanelOpen, closeSignInPanel } = useApp();
  const [isRegistering, setIsRegistering] = useState(false);

  // Function to switch to the sign-in form
  const switchToSignIn = () => setIsRegistering(false);
  // Function to switch to the registration form
  const switchToRegister = () => setIsRegistering(true);

  return (
    <div className={`panel-overlay ${isSignInPanelOpen ? 'active' : ''}`}>
      <div className="panel-container">
        <button className="panel-close" onClick={closeSignInPanel}>
          &times;
        </button>
        <div className="panel-content">
          {isRegistering ? (
            <Register onSwitchToSignIn={switchToSignIn} />
          ) : (
            <SignIn onSwitchToRegister={switchToRegister} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInPanel;