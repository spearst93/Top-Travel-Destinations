import './App.css'
import destinationsData from './data/destinations.json'
import DestinationList from './components/DestinationList'

const App = () => {
  return (
    <>
      <h1>Top Travel Destinations</h1>
      <DestinationList destinations={destinationsData.destinations} />
    </>
  )
}

export default App
