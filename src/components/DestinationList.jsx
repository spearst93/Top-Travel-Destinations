const DestinationList = ({ destinations }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center'
      }}
    >
      {destinations.map((destination, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            width: '250px',
            textAlign: 'center'
          }}
        >
          <h2>{destination.name}</h2>
          <p>{destination.country}</p>
        </div>
      ))}
    </div>
  )
}

export default DestinationList
