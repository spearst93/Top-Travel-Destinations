import { useState, MouseEvent } from 'react';
import { useTrip } from '../../contexts/TripContext';

interface AddToTripButtonProps {
  destinationId: number;
  className?: string;
}

const AddToTripButton = ({ destinationId, className = '' }: AddToTripButtonProps) => {
  const { trips, activeTrip, createTrip, addToTrip, isInAnyTrip } = useTrip();
  const [showDropdown, setShowDropdown] = useState(false);

  const inTrip = isInAnyTrip(destinationId);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (trips.length === 0) {
      const newTrip = createTrip('My Trip');
      addToTrip(newTrip.id, destinationId);
    } else if (activeTrip) {
      addToTrip(activeTrip.id, destinationId);
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const handleSelectTrip = (e: MouseEvent, tripId: string) => {
    e.preventDefault();
    e.stopPropagation();
    addToTrip(tripId, destinationId);
    setShowDropdown(false);
  };

  const handleCreateNew = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newTrip = createTrip(`Trip ${trips.length + 1}`);
    addToTrip(newTrip.id, destinationId);
    setShowDropdown(false);
  };

  return (
    <div className={`AddToTripButton-container ${className}`}>
      <button
        onClick={handleClick}
        className={`AddToTripButton ${inTrip ? 'AddToTripButton--added' : ''}`}
        aria-label={inTrip ? 'Added to trip' : 'Add to trip'}
        title={inTrip ? 'Added to trip' : 'Add to trip'}
      >
        <span aria-hidden="true">{inTrip ? '✓' : '+'}</span>
        <span className="AddToTripButton-text">{inTrip ? 'In Trip' : 'Add to Trip'}</span>
      </button>

      {showDropdown && (
        <div className="AddToTripButton-dropdown">
          {trips.map(trip => (
            <button
              key={trip.id}
              onClick={(e) => handleSelectTrip(e, trip.id)}
              className="AddToTripButton-dropdownItem"
            >
              {trip.name}
            </button>
          ))}
          <button
            onClick={handleCreateNew}
            className="AddToTripButton-dropdownItem AddToTripButton-dropdownItem--new"
          >
            + New Trip
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToTripButton;
