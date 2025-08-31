import './App.css';
import { NavLink } from 'react-router-dom';
import { useApp } from './context';
import LocationSelector from './LocationSelector';
import logo from './assets/logo.png';

const Header = () => {
  const { cartCount, isLoggedIn, logout, openSignInPanel, user} = useApp();

  return (
    <div className="bg-container">
      <div className="image-card">
        <img
          src={logo} 
          className="image-logo"
          alt="cute fox logo"
        />
      </div>
      <LocationSelector />
      <div>
        <ul className="header-list">
          <li className="list"><NavLink to="/">Home</NavLink></li>
          {isLoggedIn ? (
            <>
              {/* Display the username */}
              <li className="list" style={{ fontWeight: 'bold' }}>Hi, {user.name}</li>
              <li className="list" onClick={logout} style={{ cursor: 'pointer' }}>Sign Out</li>
            </>
          ) : (
            <li className="list" onClick={openSignInPanel} style={{ cursor: 'pointer' }}>
              Sign In
            </li>
          )}
          <li className="list">
            <NavLink to="/cart">Cart ({cartCount})</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;