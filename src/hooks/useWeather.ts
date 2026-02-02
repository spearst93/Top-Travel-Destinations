import { useState, useEffect, useCallback } from 'react';
import { getWeatherByCoordinates, WeatherData } from '../services/weatherApi';

interface UseWeatherResult {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWeather(lat: number, lng: number): UseWeatherResult {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCoordinates(lat, lng);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setIsLoading(false);
    }
  }, [lat, lng]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { weather, isLoading, error, refetch: fetchWeather };
}
