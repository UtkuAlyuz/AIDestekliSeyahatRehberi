import React, { useState, useEffect, useRef } from 'react';

import '../MapComponent.css';

function MapComponent({ locations = [] }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // DOM yüklendiğinde çalışır
    const mapContainer = mapRef.current;

    // HATA ALMAMAK İÇİN REF BOŞSA ATLA
    if (!mapContainer) return;

    console.log('Map would be initialized here with locations:', locations);

    // Haritayı sıfırla ve simülasyon görseli ekle
    mapContainer.innerHTML = '';

    const mapPlaceholder = document.createElement('div');
    mapPlaceholder.className = 'map-placeholder';
    mapPlaceholder.innerHTML = `
      <div class="map-overlay">
        <p>Interactive Map</p>
        <p>${locations.length} Locations Loaded</p>
      </div>
    `;
    mapContainer.appendChild(mapPlaceholder);

  }, [locations]);

  return (
    <div className="map-container-wrapper">
      <div className="map-container" ref={mapRef}></div>

      <div className="map-controls">
        <button className="map-control">
          <i className="fas fa-plus"></i>
        </button>
        <button className="map-control">
          <i className="fas fa-minus"></i>
        </button>
        <button className="map-control">
          <i className="fas fa-location-arrow"></i>
        </button>
      </div>
    </div>
  );
}

export default MapComponent;
