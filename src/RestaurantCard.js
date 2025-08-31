// src/RestaurantList.js

import React, { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchRestaurants, extractRestaurants, extractSectionTitle } from './api';
import { useApp } from './context';
import './App.css';

const DEFAULT_LAT = 28.7041; // Delhi fallback
const DEFAULT_LNG = 77.1025;

// The individual card component. This is the "Card" you had.
const RestaurantCard = ({ data }) => {
  const { name, cloudinaryImageId, avgRating, cuisines = [], areaName, sla = {}, id } = { ...data?.info };
  const { addToCart } = useApp();
  const [isAdded, setIsAdded] = useState(false); // Local state for visual feedback

  const rupees = typeof data.info.costForTwo === 'string'
    ? data.info.costForTwo
    : Math.round((data.info.feeDetails?.amount || 19900) / 100);
    
  const handleAddToCart = () => {
    addToCart({
      id: id,
      name,
      price: typeof rupees === 'number' ? rupees : undefined,
      cloudinaryImageId,
    });
    
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="cards">
      <NavLink to={`/restaurant/${id}`} className="card-link">
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
          alt={name}
          className="deliveryIcons"
        />
        <div>
          <h2>{name}</h2>
          <h3>⭐ {avgRating ?? '--'} • {sla?.deliveryTime ?? '--'} mins</h3>
          <p>{cuisines.join(', ')}</p>
          <p>{areaName}</p>
        </div>
      </NavLink>
      <button
        onClick={handleAddToCart}
        className={isAdded ? 'added-to-cart-btn' : ''}
      >
        {isAdded ? 'Added!' : 'Add to Cart'}
      </button>
    </div>
  );
};


// The list component. This is the "RestaurantCard" you had, renamed for clarity.
const RestaurantList = () => {
  const [list, setList] = useState([]);
  const [area, setArea] = useState('');
  const [loading, setLoading] = useState(true);
  const { searchTerm, setSearchTerm, userLocation } = useApp();
  const [rawSearch, setRawSearch] = useState('');
  
  // Debounce input into global searchTerm
  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(rawSearch), 300);
    return () => clearTimeout(id);
  }, [rawSearch, setSearchTerm]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Use the coordinates from the global state
      const { restaurants, areaTitle } = await fetchRestaurants(userLocation.lat, userLocation.lng);
      setArea(areaTitle);
      setList(restaurants);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userLocation]); // Dependency on userLocation

  const filteredList = useMemo(() => {
    const q = (searchTerm || '').toLowerCase().trim();
    if (!q) return list;
    return list.filter(r => r?.info?.name?.toLowerCase().includes(q));
  }, [list, searchTerm]);

  if (loading) return <p>Loading restaurants...</p>;
  

  return (
    <div className="restaurantslist-container">
      <h2>{area || 'All restaurants'}</h2>
      <input
        type="text"
        placeholder="Search restaurants..."
        value={rawSearch}
        onChange={(e) => setRawSearch(e.target.value)}
        className="search-input-bar"
      />
      <div>
        <ul className="restaurantslist">
          <li className="restaurantslists">Filter</li>
          <li className="restaurantslists">Sort By</li>
          <li className="restaurantslists">Rating 4.0+</li>
          <li className="restaurantslists">Fast Delivery</li>
          <li className="restaurantslists">Pure Veg</li>
          <li className="restaurantslists">Offers</li>
          <li className="restaurantslists">Rs 300-600</li>
          <li className="restaurantslists">Less than 300</li>
        </ul>
      </div>
      <div className="cardcontainer">
        {filteredList.length > 0 ? (
          filteredList.map((each) => (
            <RestaurantCard data={each} key={each?.info?.id} />
          ))
        ) : (
          <p>No restaurants match your search.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;