// // src/RestaurantMenu.js
// import { useEffect, useState } from "react";
// import { useParams, NavLink } from "react-router-dom";
// // Correctly import fetchMenu and extractMenuItems from api.js
// import { fetchMenu, extractMenuItems } from "./api";
// import { useApp } from "./context";

// export default function RestaurantMenu() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [items, setItems] = useState([]);
//   const [err, setErr] = useState("");
  
//   const { addToCart, userLocation } = useApp();

//   useEffect(() => {
//     if (!id || !userLocation?.lat || !userLocation?.lng) return;

//     const ac = new AbortController();
//     setLoading(true);
    
//     fetchMenu(id, userLocation.lat, userLocation.lng, ac.signal)
//       .then((json) => {
//          console.log('API Response:', json);
//          // Call the imported function
//          setItems(extractMenuItems(json));
//          setErr('');
//       })
//       .catch(e => {
//           if (e.name === 'AbortError') {
//               return;
//           }
//           setErr(e.message);
//       })
//       .finally(() => setLoading(false));
      
//     return () => ac.abort();
//   }, [id, userLocation]);

//   const handleAddToCart = (item) => {
//       addToCart(item);
//   };

//   return (
//     <div className="menu-page">
//       <NavLink to="/" className="back-button">Back to Restaurants</NavLink>
//       <h2>Restaurant Menu</h2>
//       {loading && <p>Loading menu...</p>}
//       {err && <p style={{ color: "#b00" }}>{err}</p>}
//       {!loading && !err && items.length === 0 && <p>No menu items found.</p>}
//       <ul className="menu-items">
//         {items.map(item => (
//           <li key={item.id} className="menu-item">
//             {item.imgId && (
//               <img
//                 src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item.imgId}`}
//                 alt={item.name}
//               />
//             )}
//             <div>
//               <p>{item.name}</p>
//               <p>₹{item.price}</p>
//             </div>
//             <button
//               onClick={() => handleAddToCart(item)}
//               className="add-to-cart-menu-btn"
//             >
//               Add
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// src/RestaurantMenu.js
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { fetchMenu, extractMenuItems } from "./api";
import { useApp } from "./context";

export default function RestaurantMenu() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  
  const { addToCart, userLocation } = useApp();

  useEffect(() => {
    if (!id || !userLocation?.lat || !userLocation?.lng) return;

    const ac = new AbortController();
    setLoading(true);
    
    fetchMenu(id, userLocation.lat, userLocation.lng, ac.signal)
      .then((json) => {
         console.log('API Response:', json);
         setItems(extractMenuItems(json));
         setErr('');
      })
      .catch(e => {
          if (e.name === 'AbortError') {
              return;
          }
          setErr(e.message);
      })
      .finally(() => setLoading(false));
      
    return () => ac.abort();
  }, [id, userLocation]);

  const handleAddToCart = (item) => {
      addToCart(item);
  };

  return (
    <div className="menu-page">
      <NavLink to="/" className="back-button">Back to Restaurants</NavLink>
      <h2>Restaurant Menu</h2>
      {loading && <p>Loading menu...</p>}
      {err && <p style={{ color: "#b00" }}>{err}</p>}
      {!loading && !err && items.length === 0 && <p>No menu items found.</p>}
      <ul className="menu-items">
        {items.map(item => (
          <li key={item.id} className="menu-item">
            {item.imgId && (
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item.imgId}`}
                alt={item.name}
              />
            )}
            <div className="item-details">
              <p className="item-name">{item.name}</p>
              <p className="item-price">₹{item.price}</p>
            </div>
            <button
              onClick={() => handleAddToCart(item)}
              className="add-to-cart-menu-btn"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}