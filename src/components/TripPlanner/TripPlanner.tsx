import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTrip } from '../../contexts/TripContext';
import TripDetail from './TripDetail';
import type { Destination } from '../../types/destination';

interface TripPlannerProps {
  destinations: Destination[];
}

const TripPlanner = ({ destinations }: TripPlannerProps) => {
  const { trips, activeTrip, setActiveTrip, createTrip, deleteTrip } = useTrip();
  const [newTripName, setNewTripName] = useState('');

  const handleCreateTrip = () => {
    if (newTripName.trim()) {
      createTrip(newTripName.trim());
      setNewTripName('');
    }
  };

  const handleDeleteTrip = (tripId: string) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(tripId);
    }
  };

  return (
    <div className="TripPlanner">
      <Link to="/" className="TripPlanner-backLink">
        &larr; Back to Destinations
      </Link>

      <h2 className="TripPlanner-title">Trip Planner</h2>

      {!activeTrip ? (
        <div className="TripPlanner-list">
          <div className="TripPlanner-createForm">
            <input
              type="text"
              value={newTripName}
              onChange={(e) => setNewTripName(e.target.value)}
              placeholder="Enter trip name..."
              className="TripPlanner-input"
              onKeyDown={(e) => e.key === 'Enter' && handleCreateTrip()}
            />
            <button
              onClick={handleCreateTrip}
              className="TripPlanner-createButton"
              disabled={!newTripName.trim()}
            >
              Create Trip
            </button>
          </div>

          {trips.length === 0 ? (
            <p className="TripPlanner-empty">
              No trips yet. Create one to start planning your adventure!
            </p>
          ) : (
            <div className="TripPlanner-trips">
              {trips.map(trip => (
                <div key={trip.id} className="TripPlanner-tripCard">
                  <div className="TripPlanner-tripInfo">
                    <h3>{trip.name}</h3>
                    <p>{trip.destinations.length} destination{trip.destinations.length !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="TripPlanner-tripActions">
                    <button
                      onClick={() => setActiveTrip(trip.id)}
                      className="TripPlanner-viewButton"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteTrip(trip.id)}
                      className="TripPlanner-deleteButton"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <TripDetail trip={activeTrip} destinations={destinations} />
      )}
    </div>
  );
};

export default TripPlanner;
