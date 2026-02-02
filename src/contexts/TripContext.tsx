import { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Trip, TripDestination } from '../types/trip';

interface TripContextType {
  trips: Trip[];
  activeTrip: Trip | null;
  activeTripId: string | null;
  setActiveTrip: (tripId: string | null) => void;
  createTrip: (name: string) => Trip;
  deleteTrip: (tripId: string) => void;
  renameTrip: (tripId: string, name: string) => void;
  addToTrip: (tripId: string, destinationId: number) => void;
  removeFromTrip: (tripId: string, itemId: string) => void;
  reorderTrip: (tripId: string, fromIndex: number, toIndex: number) => void;
  updateTripDestination: (tripId: string, itemId: string, updates: Partial<TripDestination>) => void;
  isInTrip: (tripId: string, destinationId: number) => boolean;
  isInAnyTrip: (destinationId: number) => boolean;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

interface TripProviderProps {
  children: ReactNode;
}

export function TripProvider({ children }: TripProviderProps) {
  const [trips, setTrips] = useLocalStorage<Trip[]>('trips', []);
  const [activeTripId, setActiveTripId] = useLocalStorage<string | null>('activeTripId', null);

  const activeTrip = useMemo(
    () => trips.find(t => t.id === activeTripId) || null,
    [trips, activeTripId]
  );

  const createTrip = useCallback((name: string): Trip => {
    const newTrip: Trip = {
      id: crypto.randomUUID(),
      name,
      destinations: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setTrips(prev => [...prev, newTrip]);
    setActiveTripId(newTrip.id);
    return newTrip;
  }, [setTrips, setActiveTripId]);

  const deleteTrip = useCallback((tripId: string) => {
    setTrips(prev => prev.filter(t => t.id !== tripId));
    if (activeTripId === tripId) setActiveTripId(null);
  }, [setTrips, activeTripId, setActiveTripId]);

  const renameTrip = useCallback((tripId: string, name: string) => {
    setTrips(prev => prev.map(trip =>
      trip.id === tripId ? { ...trip, name, updatedAt: Date.now() } : trip
    ));
  }, [setTrips]);

  const addToTrip = useCallback((tripId: string, destinationId: number) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      if (trip.destinations.some(d => d.destinationId === destinationId)) return trip;

      return {
        ...trip,
        updatedAt: Date.now(),
        destinations: [...trip.destinations, {
          id: crypto.randomUUID(),
          destinationId,
          addedAt: Date.now(),
          plannedDays: 3
        }]
      };
    }));
  }, [setTrips]);

  const removeFromTrip = useCallback((tripId: string, itemId: string) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      return {
        ...trip,
        updatedAt: Date.now(),
        destinations: trip.destinations.filter(d => d.id !== itemId)
      };
    }));
  }, [setTrips]);

  const reorderTrip = useCallback((tripId: string, fromIndex: number, toIndex: number) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      const newDestinations = [...trip.destinations];
      const [removed] = newDestinations.splice(fromIndex, 1);
      newDestinations.splice(toIndex, 0, removed);
      return { ...trip, updatedAt: Date.now(), destinations: newDestinations };
    }));
  }, [setTrips]);

  const updateTripDestination = useCallback((
    tripId: string,
    itemId: string,
    updates: Partial<TripDestination>
  ) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      return {
        ...trip,
        updatedAt: Date.now(),
        destinations: trip.destinations.map(d =>
          d.id === itemId ? { ...d, ...updates } : d
        )
      };
    }));
  }, [setTrips]);

  const isInTrip = useCallback(
    (tripId: string, destinationId: number) =>
      trips.find(t => t.id === tripId)?.destinations.some(d => d.destinationId === destinationId) ?? false,
    [trips]
  );

  const isInAnyTrip = useCallback(
    (destinationId: number) =>
      trips.some(t => t.destinations.some(d => d.destinationId === destinationId)),
    [trips]
  );

  const value: TripContextType = {
    trips,
    activeTrip,
    activeTripId,
    setActiveTrip: setActiveTripId,
    createTrip,
    deleteTrip,
    renameTrip,
    addToTrip,
    removeFromTrip,
    reorderTrip,
    updateTripDestination,
    isInTrip,
    isInAnyTrip
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip(): TripContextType {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within TripProvider');
  }
  return context;
}
