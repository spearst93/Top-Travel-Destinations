interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
}

const Skeleton = ({
  className = '',
  width,
  height,
  borderRadius,
  variant = 'rectangular'
}: SkeletonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return { borderRadius: '50%' };
      case 'text':
        return { borderRadius: '4px', height: height || '1em' };
      default:
        return { borderRadius: borderRadius || '4px' };
    }
  };

  return (
    <div
      className={`Skeleton ${className}`}
      style={{
        width,
        height,
        ...getVariantStyles()
      }}
      aria-hidden="true"
    />
  );
};

// Skeleton for a destination card
export const DestinationCardSkeleton = () => (
  <div className="DestinationCard-card DestinationCardSkeleton">
    <Skeleton className="DestinationCardSkeleton-image" height={200} />
    <div className="DestinationCard-info">
      <Skeleton variant="text" width="70%" height={24} className="DestinationCardSkeleton-title" />
      <Skeleton variant="text" width="40%" height={16} className="DestinationCardSkeleton-country" />
      <Skeleton variant="text" width="100%" height={14} />
      <Skeleton variant="text" width="90%" height={14} />
      <Skeleton variant="text" width="60%" height={14} />
    </div>
  </div>
);

// Skeleton for weather widget
export const WeatherSkeleton = () => (
  <div className="WeatherWidget WeatherSkeleton">
    <Skeleton variant="text" width={150} height={24} className="WeatherSkeleton-title" />
    <div className="WeatherSkeleton-content">
      <Skeleton variant="circular" width={80} height={80} />
      <div className="WeatherSkeleton-details">
        <Skeleton variant="text" width={80} height={32} />
        <Skeleton variant="text" width={120} height={18} />
        <Skeleton variant="text" width={100} height={14} />
        <Skeleton variant="text" width={90} height={14} />
      </div>
    </div>
  </div>
);

export default Skeleton;
