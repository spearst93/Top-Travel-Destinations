import type { Destination } from '../types/destination';
import type { TripDestination } from '../types/trip';

const COST_MAP: Record<string, number> = {
  Cheap: 50,
  Affordable: 100,
  Moderate: 175,
  Expensive: 300,
  Varies: 150
};

export interface TripCostSummary {
  accommodationTotal: number;
  activitiesTotal: number;
  estimatedTotal: number;
  totalDays: number;
}

export function calculateTripCost(
  tripDestinations: TripDestination[],
  allDestinations: Destination[]
): TripCostSummary {
  let accommodationTotal = 0;
  let activitiesTotal = 0;
  let totalDays = 0;

  for (const td of tripDestinations) {
    const dest = allDestinations.find(d => d.id === td.destinationId);
    if (!dest) continue;

    const days = td.plannedDays || 3;
    totalDays += days;

    const dailyAccommodation = COST_MAP[dest.costLevel.accommodation] || 150;
    accommodationTotal += dailyAccommodation * days;

    const activityCost = dest.activities.reduce((sum, a) => sum + a.cost, 0);
    activitiesTotal += activityCost;
  }

  return {
    accommodationTotal,
    activitiesTotal,
    estimatedTotal: accommodationTotal + activitiesTotal,
    totalDays
  };
}
