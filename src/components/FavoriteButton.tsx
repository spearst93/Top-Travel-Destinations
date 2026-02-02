import { MouseEvent } from 'react';
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
    <button
      onClick={handleClick}
      className={`FavoriteButton ${favorited ? 'FavoriteButton--active' : ''} ${className}`}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={favorited}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span className="FavoriteButton-icon" aria-hidden="true">
        {favorited ? '❤️' : '🤍'}
      </span>
      {showLabel && (
        <span className="FavoriteButton-label">
          {favorited ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;
