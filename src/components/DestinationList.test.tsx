import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/testUtils';
import userEvent from '@testing-library/user-event';
import DestinationList from './DestinationList';
import { mockDestinations } from '../test/mocks/destinations';

describe('DestinationList', () => {
  it('renders all destination cards', () => {
    render(<DestinationList destinations={mockDestinations} />);

    expect(screen.getByText('Test City')).toBeInTheDocument();
    expect(screen.getByText('Second City')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<DestinationList destinations={mockDestinations} />);

    expect(screen.getByPlaceholderText('Search by city or country...')).toBeInTheDocument();
  });

  it('renders season filter dropdown', () => {
    render(<DestinationList destinations={mockDestinations} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('filters destinations by search term (city name)', async () => {
    const user = userEvent.setup();
    render(<DestinationList destinations={mockDestinations} />);

    const searchInput = screen.getByPlaceholderText('Search by city or country...');
    await user.type(searchInput, 'Paris');

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.queryByText('Test City')).not.toBeInTheDocument();
    expect(screen.queryByText('Second City')).not.toBeInTheDocument();
  });

  it('filters destinations by search term (country name)', async () => {
    const user = userEvent.setup();
    render(<DestinationList destinations={mockDestinations} />);

    const searchInput = screen.getByPlaceholderText('Search by city or country...');
    await user.type(searchInput, 'France');

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.queryByText('Test City')).not.toBeInTheDocument();
  });

  it('shows no results message when no matches found', async () => {
    const user = userEvent.setup();
    render(<DestinationList destinations={mockDestinations} />);

    const searchInput = screen.getByPlaceholderText('Search by city or country...');
    await user.type(searchInput, 'Nonexistent');

    expect(screen.getByText('No destinations match your criteria.')).toBeInTheDocument();
  });

  it('filters destinations by season', async () => {
    const user = userEvent.setup();
    render(<DestinationList destinations={mockDestinations} />);

    const seasonSelect = screen.getByRole('combobox');
    await user.selectOptions(seasonSelect, 'Winter');

    // Only Second City has Winter as best season
    expect(screen.getByText('Second City')).toBeInTheDocument();
    expect(screen.queryByText('Test City')).not.toBeInTheDocument();
  });

  it('extracts unique seasons from destinations', () => {
    render(<DestinationList destinations={mockDestinations} />);

    const seasonSelect = screen.getByRole('combobox');
    expect(seasonSelect).toContainHTML('Spring');
    expect(seasonSelect).toContainHTML('Summer');
    expect(seasonSelect).toContainHTML('Fall');
    expect(seasonSelect).toContainHTML('Winter');
  });
});
