import { useWeather } from '../hooks/useWeather';
import { getWeatherIconUrl } from '../services/weatherApi';

interface WeatherWidgetProps {
  lat: number;
  lng: number;
}

const WeatherWidget = ({ lat, lng }: WeatherWidgetProps) => {
  const { weather, isLoading, error, refetch } = useWeather(lat, lng);

  if (isLoading) {
    return (
      <div className="WeatherWidget WeatherWidget--loading">
        <div className="WeatherWidget-spinner" aria-label="Loading weather data" />
        <span>Loading weather...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="WeatherWidget WeatherWidget--error">
        <p>Unable to load weather data</p>
        <button onClick={refetch} className="WeatherWidget-retry">
          Try Again
        </button>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="WeatherWidget">
      <h3 className="WeatherWidget-title">Current Weather</h3>
      <div className="WeatherWidget-content">
        <img
          src={getWeatherIconUrl(weather.icon)}
          alt={weather.description}
          className="WeatherWidget-icon"
        />
        <div className="WeatherWidget-details">
          <p className="WeatherWidget-temp">{weather.temperature}°F</p>
          <p className="WeatherWidget-desc">{weather.description}</p>
          <p className="WeatherWidget-feels">Feels like: {weather.feelsLike}°F</p>
          <p className="WeatherWidget-humidity">Humidity: {weather.humidity}%</p>
          <p className="WeatherWidget-wind">Wind: {weather.windSpeed} mph</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
