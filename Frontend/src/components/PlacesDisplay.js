import React from 'react';
import { useLocation } from 'react-router-dom';
import './PlacesDisplay.css';

const PlacesDisplay = () => {
  const location = useLocation();
  const places = location.state?.places; // Safely access the places from the state

  if (!places) {
    return <div>No places to display</div>;
  }

  return (
    <div className="places-container">
      <h2 className="places-title">Recommended Places</h2>
      <ul className="places-list">
        {places.map((place, index) => (
          <li key={index} className="place-item">{place}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlacesDisplay;
