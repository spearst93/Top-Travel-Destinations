import type { Destination } from '../../types/destination';

export const mockDestination: Destination = {
  id: 1,
  name: 'Test City',
  country: 'Test Country',
  bestSeason: 'Spring, Summer',
  description: 'A beautiful test destination for travelers',
  image: 'test.jpg',
  coordinates: { lat: 40.7128, lng: -74.006 },
  activities: [
    {
      activityName: 'Test Activity',
      category: 'Cultural',
      cost: 25,
      duration: 2,
      popularityScore: 90,
      weatherSensitive: false,
      specialFeatures: ['Guided Tour', 'Photography Allowed']
    }
  ],
  transportation: {
    airport: 'Test International Airport (TST)',
    publicTransit: ['Bus', 'Metro']
  },
  costLevel: {
    accommodation: 'Moderate',
    food: 'Affordable',
    activities: 'Varies'
  },
  safety: {
    score: 8.0,
    visaRequired: 'No for most travelers'
  }
};

export const mockDestinations: Destination[] = [
  mockDestination,
  {
    ...mockDestination,
    id: 2,
    name: 'Second City',
    country: 'Second Country',
    bestSeason: 'Fall, Winter',
    description: 'Another wonderful destination'
  },
  {
    ...mockDestination,
    id: 3,
    name: 'Paris',
    country: 'France',
    bestSeason: 'Spring, Fall',
    description: 'The City of Light'
  }
];
