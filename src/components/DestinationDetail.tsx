import { SyntheticEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Destination } from '../types/destination';
import FavoriteButton from './FavoriteButton';
import WeatherWidget from './WeatherWidget';

// Fix for default marker icons in Leaflet with bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-expect-error - Leaflet internal property override
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

interface DestinationDetailProps {
  destinations: Destination[];
}

const DestinationDetail = ({ destinations }: DestinationDetailProps) => {
  const { name } = useParams<{ name: string }>();

  const decodedName = decodeURIComponent(name || '');

  const destination = destinations.find(
    (dest) => dest.name.toLowerCase() === decodedName.toLowerCase()
  );

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = '/images/placeholder.svg';
  };

  if (!destination) {
    return (
      <div className="DestinationDetails-notFound">
        <h2>Destination Not Found</h2>
        <Link to="/" className="DestinationDetails-backLink">
          &larr; Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="DestinationDetails-detailsContainer">
      <Link to="/" className="DestinationDetails-backLink">
        &larr; Back to Destinations
      </Link>
      <div className="DestinationDetails-header">
        <h1 className="DestinationDetails-title">
          {destination.name}, {destination.country}
        </h1>
        <FavoriteButton destinationId={destination.id} showLabel />
      </div>
      <img
        src={`/images/${destination.image}`}
        alt={destination.name}
        className="DestinationDetails-image"
        loading="lazy"
        onError={handleImageError}
      />
      <p>
        <strong>Best Season:</strong> {destination.bestSeason}
      </p>
      <p>
        <strong>Description:</strong> {destination.description}
      </p>

      <WeatherWidget
        lat={destination.coordinates.lat}
        lng={destination.coordinates.lng}
      />

      <div className="DestinationDetails-map">
        <MapContainer
          center={[destination.coordinates.lat, destination.coordinates.lng]}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <Marker
            position={[
              destination.coordinates.lat,
              destination.coordinates.lng
            ]}
          >
            <Popup>
              {destination.name}, {destination.country}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default DestinationDetail;
