// src/pages/PlanTripPage.js - Trip Planning page component
import React, { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import '../PlanTripPage.css';

function PlanTripPage({ user }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    interests: [],
    pace: 'moderate',
    budget: 'medium'
  });
  const [loading, setLoading] = useState(false);

  const interestOptions = [
    'Museums', 'Historical Sites', 'Nature', 'Food & Dining',
    'Shopping', 'Art Galleries', 'Parks', 'Architecture',
    'Local Culture', 'Nightlife', 'Beaches', 'Adventure'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest) => {
    setTripData(prev => {
      const interests = [...prev.interests];
      if (interests.includes(interest)) {
        return { ...prev, interests: interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...interests, interest] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setTimeout(() => {
        console.log('Trip created:', tripData);
        setLoading(false);
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Failed to create trip:', err);
      setLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <div className="plan-trip-page">
      <div className="plan-trip-header">
        <h1>Plan Your Trip</h1>
        <div className="step-indicator">
          {[1, 2, 3].map(step => (
            <div key={step} className={`step ${currentStep >= step ? 'active' : ''}`}>
              <div className="step-number">{step}</div>
              <div className="step-label">{['Destination', 'Preferences', 'Review'][step - 1]}</div>
              {step < 3 && <div className="step-line" />}
            </div>
          ))}
        </div>
      </div>

      <form className="trip-form" onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="form-step">
            <label>Destination</label>
            <input type="text" name="destination" value={tripData.destination} onChange={handleChange} required />
            <label>Start Date</label>
            <input type="date" name="startDate" value={tripData.startDate} onChange={handleChange} required />
            <label>End Date</label>
            <input type="date" name="endDate" value={tripData.endDate} onChange={handleChange} required />
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-step">
            <label>What interests you?</label>
            <div className="interest-options">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  type="button"
                  className={`interest-btn ${tripData.interests.includes(interest) ? 'selected' : ''}`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
            <label>Pace</label>
            <select name="pace" value={tripData.pace} onChange={handleChange}>
              <option value="relaxed">Relaxed</option>
              <option value="moderate">Moderate</option>
              <option value="intense">Intense</option>
            </select>
            <label>Budget</label>
            <select name="budget" value={tripData.budget} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-step">
            <h2>Review Your Trip</h2>
            <p><strong>Destination:</strong> {tripData.destination}</p>
            <p><strong>Dates:</strong> {tripData.startDate} to {tripData.endDate}</p>
            <p><strong>Interests:</strong> {tripData.interests.join(', ')}</p>
            <p><strong>Pace:</strong> {tripData.pace}</p>
            <p><strong>Budget:</strong> {tripData.budget}</p>
            <MapComponent locations={[{ name: tripData.destination, lat: 0, lng: 0 }]} />
          </div>
        )}

        <div className="form-navigation">
          {currentStep > 1 && <button type="button" onClick={prevStep}>Previous</button>}
          {currentStep < 3 && <button type="button" onClick={nextStep}>Next</button>}
          {currentStep === 3 && <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>}
        </div>
      </form>
    </div>
  );
}

export default PlanTripPage;
