import { SyntheticEvent, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Destination } from '../types/destination';
import FavoriteButton from './FavoriteButton';
import AddToTripButton from './TripPlanner/AddToTripButton';

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

const DestinationCard = memo(({ destination, index = 0 }: DestinationCardProps) => {
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = '/images/placeholder.svg';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: 'easeOut'
      }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
    >
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
    </motion.div>
  );
});

DestinationCard.displayName = 'DestinationCard';

export default DestinationCard;
