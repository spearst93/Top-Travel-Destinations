import React from 'react'
import { useParams, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

const DestinationDetail = ({ destinations }) => {
  const { name } = useParams()

  const decodedName = decodeURIComponent(name)

  const destination = destinations.find(
    (dest) => dest.name.toLowerCase() === decodedName.toLowerCase()
  )

  if (!destination) {
    return (
      <div className="DestinationDetails-notFound">
        <h2>Destination Not Found</h2>
        <Link to="/" className="DestinationDetails-backLink">
          ← Back to Destinations
        </Link>
      </div>
    )
  }

  return (
    <div className="DestinationDetails-detailsContainer">
      <Link to="/" className="DestinationDetails-backLink">
        ← Back to Destinations
      </Link>
      <h1 className="DestinationDetails-title">
        {destination.name}, {destination.country}
      </h1>
      <img
        src={`/images/${destination.image}`}
        alt={destination.name}
        className="DestinationDetails-image"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null
          e.target.src = '/images/placeholder.jpg'
        }}
      />
      <p>
        <strong>Best Season:</strong> {destination.bestSeason}
      </p>
      <p>
        <strong>Description:</strong> {destination.description}
      </p>

      <div className="DestinationDetails-map">
        <MapContainer
          center={[destination.coordinates.lat, destination.coordinates.lng]}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
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
  )
}

DestinationDetail.propTypes = {
  destinations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      bestSeason: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      coordinates: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
      }).isRequired
    })
  ).isRequired
}

export default DestinationDetail
