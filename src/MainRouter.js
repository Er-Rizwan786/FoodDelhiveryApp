// src/MainRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Cart from './Cart';
import RestaurantMenu from './RestaurantMenu';
import SignIn from './SignIn';

const MainRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/restaurant/:id" element={<RestaurantMenu />} />
      </Routes>
    </>
  );
};

export default MainRouter;