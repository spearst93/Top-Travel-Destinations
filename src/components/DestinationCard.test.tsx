import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/testUtils';
import DestinationCard from './DestinationCard';
import { mockDestination } from '../test/mocks/destinations';

describe('DestinationCard', () => {
  it('renders destination name', () => {
    render(<DestinationCard destination={mockDestination} />);

    expect(screen.getByText('Test City')).toBeInTheDocument();
  });

  it('renders destination country', () => {
    render(<DestinationCard destination={mockDestination} />);

    expect(screen.getByText('Test Country')).toBeInTheDocument();
  });

  it('renders destination description', () => {
    render(<DestinationCard destination={mockDestination} />);

    expect(screen.getByText('A beautiful test destination for travelers')).toBeInTheDocument();
  });

  it('links to destination detail page with encoded name', () => {
    render(<DestinationCard destination={mockDestination} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/destination/Test%20City');
  });

  it('renders image with correct alt text', () => {
    render(<DestinationCard destination={mockDestination} />);

    const img = screen.getByAltText('Test City');
    expect(img).toBeInTheDocument();
  });

  it('renders image with lazy loading', () => {
    render(<DestinationCard destination={mockDestination} />);

    const img = screen.getByAltText('Test City');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('renders image with correct src path', () => {
    render(<DestinationCard destination={mockDestination} />);

    const img = screen.getByAltText('Test City');
    expect(img).toHaveAttribute('src', '/images/test.jpg');
  });
});
