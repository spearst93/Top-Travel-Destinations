import { useMemo } from 'react';
import { calculateTripCost } from '../../utils/tripCalculations';
import type { Destination } from '../../types/destination';
import type { TripDestination } from '../../types/trip';

interface TripCostSummaryProps {
  tripDestinations: TripDestination[];
  allDestinations: Destination[];
}

const TripCostSummary = ({ tripDestinations, allDestinations }: TripCostSummaryProps) => {
  const costs = useMemo(
    () => calculateTripCost(tripDestinations, allDestinations),
    [tripDestinations, allDestinations]
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="TripCostSummary">
      <h4 className="TripCostSummary-title">Estimated Costs</h4>
      <div className="TripCostSummary-grid">
        <div className="TripCostSummary-item">
          <span className="TripCostSummary-label">Total Days</span>
          <span className="TripCostSummary-value">{costs.totalDays}</span>
        </div>
        <div className="TripCostSummary-item">
          <span className="TripCostSummary-label">Accommodation</span>
          <span className="TripCostSummary-value">{formatCurrency(costs.accommodationTotal)}</span>
        </div>
        <div className="TripCostSummary-item">
          <span className="TripCostSummary-label">Activities</span>
          <span className="TripCostSummary-value">{formatCurrency(costs.activitiesTotal)}</span>
        </div>
        <div className="TripCostSummary-item TripCostSummary-item--total">
          <span className="TripCostSummary-label">Estimated Total</span>
          <span className="TripCostSummary-value">{formatCurrency(costs.estimatedTotal)}</span>
        </div>
      </div>
    </div>
  );
};

export default TripCostSummary;
