// // src/context.js

// import React, { createContext, useContext, useMemo, useReducer, useState } from 'react';

// const AppContext = createContext(null);

// const initialState = {
//   cart: [],
// };

// const DEFAULT_LAT = 28.7041; 
// const DEFAULT_LNG = 77.1025;

// function reducer(state, action) {
//   switch (action.type) {
//     case 'ADD_TO_CART': {
//       const item = action.payload;
//       const exists = state.cart.find(i => i.id === item.id);
//       const cart = exists
//         ? state.cart.map(i => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
//         : [...state.cart, { ...item, qty: 1 }];
//       return { ...state, cart };
//     }
//     case 'REMOVE_FROM_CART': {
//       const id = action.payload;
//       return { ...state, cart: state.cart.filter(i => i.id !== id) };
//     }
//     case 'DECREMENT_ITEM': {
//       const id = action.payload;
//       const cart = state.cart
//         .map(i => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
//         .filter(i => i.qty > 0);
//       return { ...state, cart };
//     }
//     case 'CLEAR_CART':
//       return { ...state, cart: [] };
//     default:
//       return state;
//   }
// }

// export const AppProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isSignInPanelOpen, setIsSignInPanelOpen] = useState(false);
  
//   const [userLocation, setUserLocation] = useState({
//     lat: DEFAULT_LAT,
//     lng: DEFAULT_LNG
//   });
//   const [userCity, setUserCity] = useState("Delhi");

//   const addToCart = (item) => {
//     dispatch({ type: 'ADD_TO_CART', payload: item });
//   };
//   const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
//   const decrementItem = (id) => dispatch({ type: 'DECREMENT_ITEM', payload: id });
//   const clearCart = () => dispatch({ type: 'CLEAR_CART' });

//   const login = (userData) => {
//     setIsLoggedIn(true);
//     setUser(userData);
//   };
//   const logout = () => {
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   const openSignInPanel = () => setIsSignInPanelOpen(true);
//   const closeSignInPanel = () => setIsSignInPanelOpen(false);

//   const cartCount = useMemo(() => state.cart.reduce((sum, i) => sum + i.qty, 0), [state.cart]);

//   const value = useMemo(() => ({
//     cart: state.cart,
//     cartCount,
//     addToCart,
//     removeFromCart,
//     decrementItem,
//     clearCart,
//     searchTerm,
//     setSearchTerm,
//     isLoggedIn,
//     user,
//     login,
//     logout,
//     isSignInPanelOpen,
//     openSignInPanel,
//     closeSignInPanel,
//     userLocation,
//     setUserLocation,
//     userCity,
//     setUserCity,
//   }), [
//       state.cart,
//       cartCount,
//       searchTerm,
//       isLoggedIn,
//       user,
//       isSignInPanelOpen,
//       userLocation,
//       userCity,
//   ]);

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useApp = () => useContext(AppContext);


// src/context.js
import React, { createContext, useContext, useMemo, useReducer, useState } from 'react';

const AppContext = createContext(null);

const initialState = {
  cart: [],
};

const DEFAULT_LAT = 28.7041; 
const DEFAULT_LNG = 77.1025;

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload;
      const exists = state.cart.find(i => i.id === item.id);
      const cart = exists
        ? state.cart.map(i => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state.cart, { ...item, qty: 1 }];
      return { ...state, cart };
    }
    case 'REMOVE_FROM_CART': {
      const id = action.payload;
      return { ...state, cart: state.cart.filter(i => i.id !== id) };
    }
    case 'DECREMENT_ITEM': {
      const id = action.payload;
      const cart = state.cart
        .map(i => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter(i => i.qty > 0);
      return { ...state, cart };
    }
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isSignInPanelOpen, setIsSignInPanelOpen] = useState(false);
  
  const [userLocation, setUserLocation] = useState({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG
  });
  const [userCity, setUserCity] = useState("Delhi");

  const addToCart = (item) => {
    // This is the function called by the Add button
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const decrementItem = (id) => dispatch({ type: 'DECREMENT_ITEM', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const openSignInPanel = () => setIsSignInPanelOpen(true);
  const closeSignInPanel = () => setIsSignInPanelOpen(false);

  const cartCount = useMemo(() => state.cart.reduce((sum, i) => sum + i.qty, 0), [state.cart]);

  const value = useMemo(() => ({
    cart: state.cart,
    cartCount,
    addToCart,
    removeFromCart,
    decrementItem,
    clearCart,
    searchTerm,
    setSearchTerm,
    isLoggedIn,
    user,
    login,
    logout,
    isSignInPanelOpen,
    openSignInPanel,
    closeSignInPanel,
    userLocation,
    setUserLocation,
    userCity,
    setUserCity,
  }), [
      state.cart,
      cartCount,
      searchTerm,
      isLoggedIn,
      user,
      isSignInPanelOpen,
      userLocation,
      userCity,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);