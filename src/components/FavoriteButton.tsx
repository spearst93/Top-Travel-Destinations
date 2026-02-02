import { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../contexts';

interface FavoriteButtonProps {
  destinationId: number;
  className?: string;
  showLabel?: boolean;
}

const FavoriteButton = ({
  destinationId,
  className = '',
  showLabel = false
}: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(destinationId);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(destinationId);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`FavoriteButton ${favorited ? 'FavoriteButton--active' : ''} ${className}`}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={favorited}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
      whileTap={{ scale: 0.85 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={favorited ? 'filled' : 'empty'}
          className="FavoriteButton-icon"
          aria-hidden="true"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.2 }}
        >
          {favorited ? '❤️' : '🤍'}
        </motion.span>
      </AnimatePresence>
      {showLabel && (
        <span className="FavoriteButton-label">
          {favorited ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </motion.button>
  );
};

export default FavoriteButton;
