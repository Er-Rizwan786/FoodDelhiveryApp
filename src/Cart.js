import './App.css';
import React from 'react';
import { useApp } from './context';

const Cart = () => {
  const { cart, removeFromCart, decrementItem, addToCart, clearCart } = useApp();

  const total = cart.reduce((sum, i) => sum + (i.price || 0) * i.qty, 0);

  return (
    <div className="cart">
      <h3>Cart</h3>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      <ul>
        {cart.map(item => (
          <li key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
            {/* <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/${item.cloudinaryImageId}`}
              alt={item.name}
              style={{ width: '80px', borderRadius: 8 }}
            /> */}
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/${item.imgId}`}
              alt={item.name}
              style={{ width: '80px', borderRadius: 8 }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{item.name}</p>
              <p style={{ margin: 0 }}>₹{item.price || '-'}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => decrementItem(item.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => addToCart(item)}>+</button>
            </div>
            <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 8 }}>Remove</button>
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h4>Total: ₹{total}</h4>
          <button onClick={clearCart}>Clear Cart</button>
          <button style={{ marginLeft: 8 }}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;