import { ChangeEvent } from 'react';

interface FilterProps {
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  seasons: string[];
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
}

const Filter = ({
  searchTerm,
  onSearchChange,
  seasons,
  selectedSeason,
  onSeasonChange
}: FilterProps) => {
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
  );
};

export default Filter;
