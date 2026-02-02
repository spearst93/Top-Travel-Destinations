export interface TripDestination {
  id: string;
  destinationId: number;
  addedAt: number;
  notes?: string;
  plannedDays: number;
}

export interface Trip {
  id: string;
  name: string;
  destinations: TripDestination[];
  createdAt: number;
  updatedAt: number;
}
