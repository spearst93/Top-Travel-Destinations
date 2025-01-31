import React from 'react'
import PropTypes from 'prop-types'

const Filter = ({
  searchTerm,
  onSearchChange,
  seasons,
  selectedSeason,
  onSeasonChange
}) => {
  return (
    <div className="Filter-filterContainer">
      <input
        type="text"
        placeholder="Search by city or country..."
        value={searchTerm}
        onChange={onSearchChange}
        className="Filter-searchBar"
      />

      <select
        value={selectedSeason}
        onChange={(e) => onSeasonChange(e.target.value)}
        className="Filter-filterDropdown"
      >
        <option value="All">All Seasons</option>
        {seasons.map((season, index) => (
          <option key={index} value={season}>
            {season}
          </option>
        ))}
      </select>
    </div>
  )
}

Filter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  seasons: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedSeason: PropTypes.string.isRequired,
  onSeasonChange: PropTypes.func.isRequired
}

export default Filter
