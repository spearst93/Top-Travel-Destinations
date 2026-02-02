import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useTrip } from '../../contexts/TripContext';
import SortableTripItem from './SortableTripItem';
import TripCostSummary from './TripCostSummary';
import type { Trip } from '../../types/trip';
import type { Destination } from '../../types/destination';

interface TripDetailProps {
  trip: Trip;
  destinations: Destination[];
}

const TripDetail = ({ trip, destinations }: TripDetailProps) => {
  const { setActiveTrip, reorderTrip, removeFromTrip, updateTripDestination } = useTrip();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = trip.destinations.findIndex(d => d.id === active.id);
      const newIndex = trip.destinations.findIndex(d => d.id === over.id);
      reorderTrip(trip.id, oldIndex, newIndex);
    }
  };

  const getDestination = (destinationId: number) => {
    return destinations.find(d => d.id === destinationId);
  };

  return (
    <div className="TripDetail">
      <div className="TripDetail-header">
        <button
          onClick={() => setActiveTrip(null)}
          className="TripDetail-backButton"
        >
          &larr; All Trips
        </button>
        <h3 className="TripDetail-name">{trip.name}</h3>
      </div>

      {trip.destinations.length === 0 ? (
        <p className="TripDetail-empty">
          No destinations added yet. Go back to the home page and add some!
        </p>
      ) : (
        <>
          <TripCostSummary
            tripDestinations={trip.destinations}
            allDestinations={destinations}
          />

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={trip.destinations.map(d => d.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="TripDetail-items">
                {trip.destinations.map((item, index) => {
                  const destination = getDestination(item.destinationId);
                  if (!destination) return null;

                  return (
                    <SortableTripItem
                      key={item.id}
                      item={item}
                      destination={destination}
                      index={index}
                      onRemove={() => removeFromTrip(trip.id, item.id)}
                      onUpdateDays={(days) =>
                        updateTripDestination(trip.id, item.id, { plannedDays: days })
                      }
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        </>
      )}
    </div>
  );
};

export default TripDetail;
