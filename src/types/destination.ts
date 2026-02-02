export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Activity {
  activityName: string;
  category: string;
  cost: number;
  duration: number;
  popularityScore: number;
  weatherSensitive: boolean;
  specialFeatures: string[];
}

export interface Transportation {
  airport: string;
  publicTransit: string[];
}

export interface CostLevel {
  accommodation: 'Cheap' | 'Affordable' | 'Moderate' | 'Expensive';
  food: 'Cheap' | 'Affordable' | 'Moderate' | 'Expensive' | 'Varies';
  activities: 'Cheap' | 'Affordable' | 'Moderate' | 'Expensive' | 'Varies';
}

export interface Safety {
  score: number;
  visaRequired: string;
}

export interface Destination {
  id: number;
  name: string;
  country: string;
  bestSeason: string;
  description: string;
  image: string;
  coordinates: Coordinates;
  activities: Activity[];
  transportation: Transportation;
  costLevel: CostLevel;
  safety: Safety;
}

export interface DestinationsData {
  destinations: Destination[];
}
