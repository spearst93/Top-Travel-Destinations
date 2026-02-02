import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from 'react-router-dom';
import type { Destination } from '../../types/destination';
import type { TripDestination } from '../../types/trip';

interface SortableTripItemProps {
  item: TripDestination;
  destination: Destination;
  index: number;
  onRemove: () => void;
  onUpdateDays: (days: number) => void;
}

const SortableTripItem = ({
  item,
  destination,
  index,
  onRemove,
  onUpdateDays
}: SortableTripItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div ref={setNodeRef} style={style} className="TripItem">
      <div className="TripItem-order">{index + 1}</div>

      <button
        {...attributes}
        {...listeners}
        className="TripItem-dragHandle"
        aria-label="Drag to reorder"
      >
        ⋮⋮
      </button>

      <img
        src={`/images/${destination.image}`}
        alt={destination.name}
        className="TripItem-image"
      />

      <div className="TripItem-info">
        <Link
          to={`/destination/${encodeURIComponent(destination.name)}`}
          className="TripItem-name"
        >
          {destination.name}
        </Link>
        <p className="TripItem-country">{destination.country}</p>

        <label className="TripItem-daysLabel">
          Days:
          <input
            type="number"
            min="1"
            max="30"
            value={item.plannedDays}
            onChange={(e) => onUpdateDays(parseInt(e.target.value) || 1)}
            className="TripItem-daysInput"
          />
        </label>
      </div>

      <button
        onClick={onRemove}
        className="TripItem-remove"
        aria-label="Remove from trip"
      >
        ✕
      </button>
    </div>
  );
};

export default SortableTripItem;
