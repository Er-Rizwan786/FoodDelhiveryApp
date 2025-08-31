// // src/MainRouter.js
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';

// import Header from './Header';
// import Home from './Home';
// import Cart from './Cart';
// import RestaurantMenu from './RestaurantMenu';
// import SignIn from './SignIn';

// const MainRouter = () => {
//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/restaurant/:id" element={<RestaurantMenu />} />
//       </Routes>
//     </>
//   );
// };

// export default MainRouter;



// src/MainRouter.js
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import Home from './Home';
import Cart from './Cart';
import RestaurantMenu from './RestaurantMenu';
import SignIn from './SignIn';
import Header from './Header';
import logo from './assets/logo.png'; // Make sure this path is correct

const MainRouter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/restaurant/:id" element={<RestaurantMenu />} />
      </Routes>
      
      {/* Add the Footer here */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>
              <img src={logo} className="footer-logo" alt="logo" /> Swift Bites
            </h4>
            <p>&copy; {currentYear} Swift Bites. All rights reserved.</p>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Made with ❤️ for the world.</p>
        </div>
      </footer>
    </>
  );
};

export default MainRouter;