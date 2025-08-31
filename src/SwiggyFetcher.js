// src/SwiggyFetcher.js

import React, { useState, useEffect } from 'react';
import { fetchRestaurants } from './api';

const SwiggyFetcher = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set a default location (e.g., Bangalore)
        const lat = 12.9716;
        const lng = 77.5946;

        const { restaurants: fetchedRestaurants, areaTitle } = await fetchRestaurants(lat, lng);
        setRestaurants(fetchedRestaurants);
        console.log(`Successfully fetched restaurants for: ${areaTitle}`);
      } catch (err) {
        console.error('Failed to fetch restaurants:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading restaurants...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Restaurants in Bangalore</h1>
      {restaurants.length > 0 ? (
        <ul>
          {restaurants.map(restaurant => (
            <li key={restaurant.info.id}>
              <h3>{restaurant.info.name}</h3>
              <p>{restaurant.info.cuisines.join(', ')}</p>
              <p>Rating: {restaurant.info.avgRating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No restaurants found.</p>
      )}
    </div>
  );
};

export default SwiggyFetcher;