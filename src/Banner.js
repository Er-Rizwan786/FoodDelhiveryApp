// src/Banner.js
import './App.css';
import { useState, useEffect } from 'react';
import {
  buildListingUrl,
  fetchRestaurants,
  extractBannerImages,
} from './api';

const Card = ({ imageId }) => (
  <img
    src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + extractBannerImages}
    alt="banner"
    className="logoimage"
  />
);

const Banner = () => {
  const [images, setImages] = useState([]);
  const lat = 23.7956531;
  const lng = 86.43038589999999;

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const json = await fetchRestaurants(lat, lng, ac.signal);
        const imgs = extractBannerImages(json);
        setImages(imgs);
      } catch (e) {
        console.error('Banner fetch error:', e);
        setImages([]);
      }
    })();
    return () => ac.abort();
  }, []);

  return (
    <div>
      <div className="bannerConatiner">
        {/* <h3>What's on your mind?</h3> */}
      </div>
      <div className="bannerConatiner">
        {images.length > 0 ? (
          images.map((id) => <Card imageId={id} key={id} />)
        ) : (
          <p>No banners available.</p>
        )}
      </div>
    </div>
  );
};

export default Banner;