import { SyntheticEvent, memo } from 'react';
import { Link } from 'react-router-dom';
import type { Destination } from '../types/destination';
import FavoriteButton from './FavoriteButton';
import AddToTripButton from './TripPlanner/AddToTripButton';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = memo(({ destination }: DestinationCardProps) => {
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = '/images/placeholder.svg';
  };

  return (
    <Link
      to={`/destination/${encodeURIComponent(destination.name)}`}
      className="DestinationCard-cardLink"
    >
      <article className="DestinationCard-card">
        <div className="DestinationCard-imageContainer">
          <img
            src={`/images/${destination.image}`}
            alt={destination.name}
            className="DestinationCard-image"
            loading="lazy"
            width={400}
            height={200}
            onError={handleImageError}
          />
          <FavoriteButton
            destinationId={destination.id}
            className="DestinationCard-favorite"
          />
          <AddToTripButton
            destinationId={destination.id}
            className="DestinationCard-addToTrip"
          />
        </div>

        <div className="DestinationCard-info">
          <h2 className="DestinationCard-title">{destination.name}</h2>
          <p className="DestinationCard-country">{destination.country}</p>
          <p className="DestinationCard-description">
            {destination.description}
          </p>
        </div>
      </article>
    </Link>
  );
});

DestinationCard.displayName = 'DestinationCard';

export default DestinationCard;
