// src/LocationSelector.js
import React, { useState } from 'react';
import { useApp } from './context';
import './App.css';

const LOCATIONS = {
  'agra': { lat: 27.1767, lng: 78.0081 },
  'ahmedabad': { lat: 23.0225, lng: 72.5714 },
  'ajmer': { lat: 26.4499, lng: 74.6399 },
  'alappuzha': { lat: 9.4981, lng: 76.3388 },
  'aligarh': { lat: 27.8974, lng: 78.0880 },
  'allahabad': { lat: 25.4358, lng: 81.8463 },
  'amravati': { lat: 20.9374, lng: 77.7788 },
  'amritsar': { lat: 31.6340, lng: 74.8732 },
  'anand': { lat: 22.5587, lng: 72.9566 },
  'anantapur': { lat: 14.6819, lng: 77.6006 },
  'aurangabad': { lat: 19.8762, lng: 75.3433 },
  'bahadurgarh': { lat: 28.6833, lng: 76.9333 },
  'bangalore': { lat: 12.9716, lng: 77.5946 },
  'bareilly': { lat: 28.3670, lng: 79.4304 },
  'basti': { lat: 26.8041, lng: 82.7483 },
  'bhavnagar': { lat: 21.7645, lng: 72.1519 },
  'bhopal': { lat: 23.2599, lng: 77.4126 },
  'bhubaneswar': { lat: 20.2961, lng: 85.8245 },
  'chandigarh': { lat: 30.7333, lng: 76.7794 },
  'chennai': { lat: 13.0827, lng: 80.2707 },
  'coimbatore': { lat: 11.0168, lng: 76.9558 },
  'cuttack': { lat: 20.4625, lng: 85.8828 },
  'dehradun': { lat: 30.3165, lng: 78.0322 },
  'delhi': { lat: 28.7041, lng: 77.1025 },
  'dhanbad': { lat: 23.7957, lng: 86.4304 },
  'dharwad': { lat: 15.4593, lng: 75.0069 },
  'durgapur': { lat: 23.5350, lng: 87.3105 },
  'erode': { lat: 11.3414, lng: 77.7282 },
  'faridabad': { lat: 28.4089, lng: 77.3178 },
  'ghaziabad': { lat: 28.6692, lng: 77.4538 },
  'goa': { lat: 15.2993, lng: 74.1240 },
  'gurgaon': { lat: 28.4595, lng: 77.0266 },
  'guwahati': { lat: 26.1445, lng: 91.7362 },
  'gwalior': { lat: 26.2124, lng: 78.1772 },
  'haldwani': { lat: 29.2132, lng: 79.5133 },
  'hospet': { lat: 15.2604, lng: 76.3929 },
  'howrah': { lat: 22.5958, lng: 88.2636 },
  'hyderabad': { lat: 17.3850, lng: 78.4867 },
  'indore': { lat: 22.7196, lng: 75.8577 },
  'jaipur': { lat: 26.9124, lng: 75.7873 },
  'jalandhar': { lat: 31.3260, lng: 75.5762 },
  'jamshedpur': { lat: 22.8046, lng: 86.2029 },
  'kanpur': { lat: 26.4499, lng: 80.3319 },
  'kochi': { lat: 9.9312, lng: 76.2673 },
  'kolhapur': { lat: 16.7050, lng: 74.2433 },
  'kolkata': { lat: 22.5726, lng: 88.3639 },
  'kota': { lat: 25.2138, lng: 75.8648 },
  'kurnool': { lat: 15.8222, lng: 78.0353 },
  'lucknow': { lat: 26.8467, lng: 80.9462 },
  'ludhiana': { lat: 30.9010, lng: 75.8573 },
  'madurai': { lat: 9.9252, lng: 78.1198 },
  'mangalore': { lat: 12.9141, lng: 74.8560 },
  'meerut': { lat: 28.9845, lng: 77.7064 },
  'mumbai': { lat: 19.0760, lng: 72.8777 },
  'mysore': { lat: 12.2958, lng: 76.6552 },
  'nagpur': { lat: 21.1458, lng: 79.0882 },
  'nashik': { lat: 20.0076, lng: 73.7942 },
  'noida': { lat: 28.5355, lng: 77.3910 },
  'patna': { lat: 25.5941, lng: 85.1376 },
  'pondicherry': { lat: 11.9416, lng: 79.8083 },
  'pune': { lat: 18.5204, lng: 73.8567 },
  'raipur': { lat: 21.2514, lng: 81.6296 },
  'rajkot': { lat: 22.3039, lng: 70.8022 },
  'ranchi': { lat: 23.3441, lng: 85.3096 },
  'rohtak': { lat: 28.8955, lng: 76.6066 },
  'rourkela': { lat: 22.2585, lng: 84.8856 },
  'salem': { lat: 11.6643, lng: 78.1460 },
  'shimla': { lat: 31.1048, lng: 77.1734 },
  'siliguri': { lat: 26.7271, lng: 88.3953 },
  'solapur': { lat: 17.6599, lng: 75.9064 },
  'srinagar': { lat: 34.0837, lng: 74.7973 },
  'surat': { lat: 21.1702, lng: 72.8311 },
  'thane': { lat: 19.2183, lng: 72.9781 },
  'udaipur': { lat: 24.5854, lng: 73.7125 },
  'vadodara': { lat: 22.3072, lng: 73.1812 },
  'varanasi': { lat: 25.3176, lng: 82.9739 },
  'vijayawada': { lat: 16.5062, lng: 80.6480 },
  'vizag': { lat: 17.6868, lng: 83.2185 },
  'warangal': { lat: 17.9689, lng: 79.5941 },
};

const LocationSelector = () => {
  const { setUserLocation, setUserCity } = useApp();
  const [cityInput, setCityInput] = useState('');
  const [error, setError] = useState(null);

  const handleCityChange = (e) => {
    const input = e.target.value;
    setCityInput(input);
    const lowercaseInput = input.toLowerCase();
    
    // Clear the error message as the user types
    setError(null);
    
    const newLocation = LOCATIONS[lowercaseInput];
    
    if (newLocation) {
        // Set both the location and the city name in the global state
        setUserLocation(newLocation);
        setUserCity(input);
    } else if (input.length > 2) {
      // Show an error if the city is not in the list and the input is not empty
      setError(`"${input}" is not a supported city.`);
    }
  };

  return (
    <div style={{ marginLeft: 20, position: 'relative' }}>
      <input
        type="text"
        placeholder="Enter city (e.g., Delhi, Mumbai)"
        value={cityInput}
        onChange={handleCityChange}
        className="search-input"
        style={{ width: '250px' }}
      />
      {error && (
        <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default LocationSelector;