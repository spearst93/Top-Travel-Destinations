import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import destinationsData from './data/destinations.json'
import DestinationList from './components/DestinationList'
import DestinationDetail from './components/DestinationDetail'

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1 className="main-title">
          Top 25 Must-See Places – Find Your Perfect Season
        </h1>

        <Routes>
          <Route
            path="/"
            element={
              <DestinationList destinations={destinationsData.destinations} />
            }
          />

          <Route
            path="/destination/:name"
            element={
              <DestinationDetail destinations={destinationsData.destinations} />
            }
          />

          <Route
            path="*"
            element={
              <div className="App-notFound">
                <h2>404 - Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/" className="App-backLink">
                  ← Back to Home
                </a>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
