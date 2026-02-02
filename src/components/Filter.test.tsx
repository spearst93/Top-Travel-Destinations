import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test/testUtils';
import userEvent from '@testing-library/user-event';
import Filter from './Filter';

describe('Filter', () => {
  const defaultProps = {
    searchTerm: '',
    onSearchChange: vi.fn(),
    seasons: ['Spring', 'Summer', 'Fall', 'Winter'],
    selectedSeason: 'All',
    onSeasonChange: vi.fn()
  };

  it('renders search input with placeholder', () => {
    render(<Filter {...defaultProps} />);

    expect(screen.getByPlaceholderText('Search by city or country...')).toBeInTheDocument();
  });

  it('renders season dropdown with all options', () => {
    render(<Filter {...defaultProps} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('All Seasons')).toBeInTheDocument();
    expect(screen.getByText('Spring')).toBeInTheDocument();
    expect(screen.getByText('Summer')).toBeInTheDocument();
    expect(screen.getByText('Fall')).toBeInTheDocument();
    expect(screen.getByText('Winter')).toBeInTheDocument();
  });

  it('displays current search term value', () => {
    render(<Filter {...defaultProps} searchTerm="Paris" />);

    expect(screen.getByDisplayValue('Paris')).toBeInTheDocument();
  });

  it('displays selected season', () => {
    render(<Filter {...defaultProps} selectedSeason="Summer" />);

    expect(screen.getByRole('combobox')).toHaveValue('Summer');
  });

  it('calls onSearchChange when typing', async () => {
    const onSearchChange = vi.fn();
    const user = userEvent.setup();
    render(<Filter {...defaultProps} onSearchChange={onSearchChange} />);

    const input = screen.getByPlaceholderText('Search by city or country...');
    await user.type(input, 'P');

    expect(onSearchChange).toHaveBeenCalled();
  });

  it('calls onSeasonChange when selecting a season', async () => {
    const onSeasonChange = vi.fn();
    const user = userEvent.setup();
    render(<Filter {...defaultProps} onSeasonChange={onSeasonChange} />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'Summer');

    expect(onSeasonChange).toHaveBeenCalledWith('Summer');
  });
});
