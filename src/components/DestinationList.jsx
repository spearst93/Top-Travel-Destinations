

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DestinationCard from './DestinationCard'
import Filter from './Filter'

const DestinationList = ({ destinations }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [seasonFilter, setSeasonFilter] = useState('All')

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSeasonFilter = (selectedSeason) => {
    setSeasonFilter(selectedSeason)
  }

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSeason =
      seasonFilter === 'All' ||
      destination.bestSeason.toLowerCase().includes(seasonFilter.toLowerCase())

    return matchesSearch && matchesSeason
  })

  const seasons = Array.from(
    new Set(
      destinations.flatMap((dest) =>
        dest.bestSeason.split(', ').map((season) => season.trim())
      )
    )
  )

  return (
    <div className="DestinationList-container">
      <Filter
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        seasons={seasons}
        selectedSeason={seasonFilter}
        onSeasonChange={handleSeasonFilter}
      />

      <div className="DestinationList-destinationList">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))
        ) : (
          <p className="DestinationList-noResults">
            No destinations match your criteria.
          </p>
        )}
      </div>
    </div>
  )
}

DestinationList.propTypes = {
  destinations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      bestSeason: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired
}

export default DestinationList
