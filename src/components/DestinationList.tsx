import { useState, ChangeEvent } from 'react';
import DestinationCard from './DestinationCard';
import Filter from './Filter';
import type { Destination } from '../types/destination';

interface DestinationListProps {
  destinations: Destination[];
}

const DestinationList = ({ destinations }: DestinationListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [seasonFilter, setSeasonFilter] = useState('All');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSeasonFilter = (selectedSeason: string) => {
    setSeasonFilter(selectedSeason);
  };

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeason =
      seasonFilter === 'All' ||
      destination.bestSeason.toLowerCase().includes(seasonFilter.toLowerCase());

    return matchesSearch && matchesSeason;
  });

  const seasons = Array.from(
    new Set(
      destinations.flatMap((dest) =>
        dest.bestSeason.split(', ').map((season) => season.trim())
      )
    )
  );

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
          filteredDestinations.map((destination, index) => (
            <DestinationCard key={destination.id} destination={destination} index={index} />
          ))
        ) : (
          <p className="DestinationList-noResults">
            No destinations match your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default DestinationList;
