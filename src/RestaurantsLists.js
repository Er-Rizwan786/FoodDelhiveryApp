// src/RestaurantList.js
import React, { useState, useEffect, useMemo } from 'react';
import { fetchRestaurants } from './api';
import { useApp } from './context';
import { NavLink } from 'react-router-dom';
import './App.css';

const DEFAULT_LAT = 28.7041;
const DEFAULT_LNG = 77.1025;

// Individual restaurant card
const RestaurantCard = ({ data }) => {
  const { name, cloudinaryImageId, avgRating, cuisines = [], areaName, sla = {}, id } = { ...data?.info };
  const { addToCart } = useApp();
  const [isAdded, setIsAdded] = useState(false);

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
    setTimeout(() => setIsAdded(false), 1500);
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
    </div>
  );
};

// Restaurant list component
const RestaurantList = () => {
  const [list, setList] = useState([]);
  const [area, setArea] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userLocation } = useApp();
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
      isRatingFilterActive: false,
      isPureVegFilterActive: false,
  });
  
  const toggleFilter = (filterName) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName]
    }));
  };

  // Fetch data when userLocation changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { restaurants, areaTitle } = await fetchRestaurants(
          userLocation.lat || DEFAULT_LAT,
          userLocation.lng || DEFAULT_LNG
        );
        setList(restaurants);
        setArea(areaTitle);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setError("Failed to fetch restaurants. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userLocation]);

  // Use useMemo for filtering logic
  const filteredRestaurants = useMemo(() => {
      let currentList = list;

      // Apply search filter
      if (searchTerm) {
          currentList = currentList.filter(r => 
              r?.info?.name?.toLowerCase().includes(searchTerm.toLowerCase())
          );
      }

      // Apply rating filter
      if (filters.isRatingFilterActive) {
          currentList = currentList.filter(r => r?.info?.avgRating >= 4.0);
      }
      
      // Apply pure veg filter
      if (filters.isPureVegFilterActive) {
          currentList = currentList.filter(r => r?.info?.veg);
      }
      
      return currentList;
  }, [list, searchTerm, filters]);


  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;

  return (
    <div className="restaurantslist-container">
      <h2>{area || 'All restaurants'}</h2>

      <input
        type="text"
        placeholder="Search restaurants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input-body"
      />

      <div>
        <ul className="restaurantslist">
          <li className="restaurantslists">Filter</li>
          <li 
            className={`restaurantslists ${filters.isRatingFilterActive ? 'active-filter' : ''}`}
            onClick={() => toggleFilter('isRatingFilterActive')}
          >
            Rating 4.0+
          </li>
          <li 
            className={`restaurantslists ${filters.isPureVegFilterActive ? 'active-filter' : ''}`}
            onClick={() => toggleFilter('isPureVegFilterActive')}
          >
            Pure Veg
          </li>
        </ul>
      </div>

      <div className="cardcontainer">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((each) => (
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