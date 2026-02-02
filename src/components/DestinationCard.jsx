import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const DestinationCard = ({ destination }) => {
  return (
    <Link
      to={`/destination/${encodeURIComponent(destination.name)}`}
      className="DestinationCard-cardLink"
    >
      <div className="DestinationCard-card">
        <img
          src={`/images/${destination.image}`}
          alt={`${destination.name}`}
          className="DestinationCard-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = '/images/placeholder.svg'
          }}
        />

        <div className="DestinationCard-info">
          <h2 className="DestinationCard-title">{destination.name}</h2>
          <p className="DestinationCard-country">{destination.country}</p>
          <p className="DestinationCard-description">
            {destination.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

DestinationCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
}

export default DestinationCard
