import React, { useState, useEffect, useRef } from 'react';

import '../PlaceCard.css';

function PlaceCard({ place }) {
  return (
    <div className="place-card">
      <div className="place-image">
        <img src={place.imageUrl} alt={place.name} />
        {place.isFeatured && <span className="featured-badge">Featured</span>}
      </div>
      <div className="place-content">
        <h3>{place.name}</h3>
        <p className="place-location">
          <i className="fas fa-map-marker-alt"></i> {place.location}
        </p>
        <div className="place-info">
          <span className="place-rating">
            <i className="fas fa-star"></i> {place.rating}
          </span>
          <span className="place-category">{place.category}</span>
        </div>
        <p className="place-description">{place.description}</p>
        <button className="add-to-trip-btn">
          <i className="fas fa-plus"></i> Add to Trip
        </button>
      </div>
    </div>
  );
}

export default PlaceCard;