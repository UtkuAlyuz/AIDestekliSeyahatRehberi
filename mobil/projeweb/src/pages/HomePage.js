import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import PlaceCard from '../components/PlaceCard';
import '../HomePage.css';


function HomePage({ user }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would be replaced with actual API call
    // For demo purposes, we're using mock data
    setTimeout(() => {
      const mockPlaces = [
        {
          id: 1,
          name: 'Eiffel Tower',
          location: 'Paris, France',
          description: 'Iconic iron tower offering city views.',
          imageUrl: 'https://source.unsplash.com/random/300x200/?eiffel',
          rating: 4.8,
          category: 'Landmark',
          isFeatured: true
        },
        {
          id: 2,
          name: 'Colosseum',
          location: 'Rome, Italy',
          description: 'Ancient amphitheater with a rich history.',
          imageUrl: 'https://source.unsplash.com/random/300x200/?colosseum',
          rating: 4.7,
          category: 'Historical'
        },
        {
          id: 3,
          name: 'Sagrada Familia',
          location: 'Barcelona, Spain',
          description: 'Stunning basilica designed by Antoni Gaudí.',
          imageUrl: 'https://source.unsplash.com/random/300x200/?sagrada',
          rating: 4.9,
          category: 'Architecture'
        },
        {
          id: 4,
          name: 'Central Park',
          location: 'New York, USA',
          description: 'Urban park in Manhattan spanning 843 acres.',
          imageUrl: 'https://source.unsplash.com/random/300x200/?centralpark',
          rating: 4.6,
          category: 'Nature'
        }
      ];
      setPlaces(mockPlaces);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="welcome-message">
          <h1>Welcome, {user.name}!</h1>
          <p>Ready to explore new destinations?</p>
          <Link to="/plan-trip" className="plan-trip-btn">
            <i className="fas fa-route"></i> Plan Your Trip
          </Link>
        </div>
      </div>

      <div className="map-section">
        <h2>Discover Amazing Places</h2>
        <MapComponent locations={places.map(place => ({ 
          id: place.id, 
          name: place.name, 
          lat: Math.random() * 90, // Mock data
          lng: Math.random() * 180 // Mock data
        }))} />
      </div>

      <div className="popular-places">
        <h2>Popular Destinations</h2>
        {loading ? (
          <div className="loading-places">Loading popular places...</div>
        ) : (
          <div className="places-grid">
            {places.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </div>

      <div className="features-section">
        <h2>Why Choose TravelinGo?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-brain"></i>
            <h3>AI-Powered Planning</h3>
            <p>Our AI creates optimized routes based on your preferences.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-clock"></i>
            <p>Time-Saving</p>
            <p>Create a complete itinerary in minutes, not hours.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-map-marked-alt"></i>
            <h3>Personalized Routes</h3>
            <p>Get routes tailored to your interests and travel style.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-user-friends"></i>
            <h3>Travel Solo or Together</h3>
            <p>Perfect for individual travelers or small groups.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;