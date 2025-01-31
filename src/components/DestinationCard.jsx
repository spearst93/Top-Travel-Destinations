const DestinationCard = ({ destination }) => {
  return (
    <Link
      to={`/destination/${encodeURIComponent(destination.name)}`}
      className={styles.cardLink}
    >
      <div className={styles.card}>
        <img
          src={`/images/${destination.image}`}
          alt={`${destination.name}`}
          className={styles.image}
          loading="lazy" // Enables native lazy loading
          onError={(e) => {
            e.target.onerror = null
            e.target.src = '/images/placeholder.jpg'
          }} // Fallback to placeholder
        />
        <div className={styles.info}>
          <h2>{destination.name}</h2>
          <p>{destination.country}</p>
          <p className={styles.description}>{destination.description}</p>{' '}
          {/* Brief Description */}
        </div>
      </div>
    </Link>
  )
}

export default DestinationCard
