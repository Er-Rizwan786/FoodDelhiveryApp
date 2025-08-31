// src/RestaurantList.js
import React, { useState, useEffect, useMemo } from 'react';
import { fetchRestaurants, extractRestaurants, extractSectionTitle } from './api';
import { useApp } from './context';
import { NavLink } from 'react-router-dom';
import './App.css';

const DEFAULT_LAT = 12.9716; 
const DEFAULT_LNG = 77.5946;

const RestaurantCard = ({ data }) => {
  const { name, cloudinaryImageId, avgRating, cuisines = [], areaName, sla = {}, id } = { ...data?.info };
  const { addToCart } = useApp();

  const rupees = typeof data.info.costForTwo === 'string'
    ? data.info.costForTwo
    : Math.round((data.info.feeDetails?.amount || 19900) / 100);

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
        onClick={() =>
          addToCart({
            id: id,
            name,
            price: typeof rupees === 'number' ? rupees : undefined,
            cloudinaryImageId,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
};

const RestaurantList = () => {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("Top restaurants near you");
  const [loading, setLoading] = useState(true);
  const { searchTerm, setSearchTerm, userLocation } = useApp();
  const [error, setError] = useState(null);
  
  const [isRatingFilterActive, setIsRatingFilterActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      const latToFetch = userLocation?.lat ?? DEFAULT_LAT;
      const lngToFetch = userLocation?.lng ?? DEFAULT_LNG;

      try {
        const { restaurants, areaTitle } = await fetchRestaurants(latToFetch, lngToFetch);
        setList(restaurants);
        setTitle(areaTitle);
        if (restaurants.length === 0) {
          setError("Sorry, no restaurants found in this area.");
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError("Failed to load restaurants. Please check your internet connection or try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [userLocation]);

  const filteredList = useMemo(() => {
    const q = (searchTerm || '').toLowerCase().trim();
    let currentList = list;

    if (q) {
      currentList = currentList.filter(r => r?.info?.name?.toLowerCase().includes(q));
    }
    
    if (isRatingFilterActive) {
      currentList = currentList.filter(r => r?.info?.avgRating >= 4.0);
    }

    return currentList;
  }, [list, searchTerm, isRatingFilterActive]);

  if (loading) return <p>Loading restaurants...</p>;

  if (error) {
    return (
      <div className="restaurantslist-container" style={{ textAlign: 'center' }}>
        <h2>Error</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="restaurantslist-container">
      <h2>{title || "Top restaurants near you"}</h2>
      <div className="search-container-body">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input-body"
        />
        <ul className="restaurantslist">
          <li className="restaurantslists">Filter</li>
          <li className="restaurantslists">Sort By</li>
          
          <li 
            className={`restaurantslists ${isRatingFilterActive ? 'active-filter' : ''}`}
            onClick={() => setIsRatingFilterActive(!isRatingFilterActive)}
          >
            Rating 4.0+
          </li>
          
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