import React, { useState, useEffect, useRef } from 'react';

import '../ProfilePage.css';

function ProfilePage({ user, onLogout }) {
  const [userProfile, setUserProfile] = useState({
    ...user,
    interests: ['Beaches', 'Museums', 'Local Cuisine', 'Hiking'],
    trips: []
  });
  const [loading, setLoading] = useState(true);
  const [pastTrips, setPastTrips] = useState([]);

  useEffect(() => {
    // This would be replaced with actual API call
    // For demo purposes, we're using mock data
    setTimeout(() => {
      const mockPastTrips = [
        {
          id: 1,
          destination: 'Paris, France',
          date: '12-15 March 2023',
          image: 'https://source.unsplash.com/random/300x200/?paris'
        },
        {
          id: 2,
          destination: 'Barcelona, Spain',
          date: '5-10 June 2023',
          image: 'https://source.unsplash.com/random/300x200/?barcelona'
        }
      ];
      setPastTrips(mockPastTrips);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={user.avatar} alt={user.name} />
        </div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">{pastTrips.length}</span>
              <span className="stat-label">Trips</span>
            </div>
            <div className="stat">
              <span className="stat-value">{userProfile.interests.length}</span>
              <span className="stat-label">Interests</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Your Interests</h2>
          <div className="interests-tags">
            {userProfile.interests.map((interest, index) => (
              <span key={index} className="interest-tag">{interest}</span>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h2>Past Trips</h2>
          {loading ? (
            <div className="loading-trips">Loading your trips...</div>
          ) : pastTrips.length > 0 ? (
            <div className="past-trips">
              {pastTrips.map(trip => (
                <div key={trip.id} className="trip-item">
                  <div className="trip-image">
                    <img src={trip.image} alt={trip.destination} />
                  </div>
                  <div className="trip-details">
                    <h3>{trip.destination}</h3>
                    <p>{trip.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't taken any trips yet.</p>
          )}
        </div>

        <div className="profile-actions">
          <button className="edit-profile-btn">Edit Profile</button>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;