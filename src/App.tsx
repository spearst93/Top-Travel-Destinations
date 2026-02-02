import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import destinationsData from './data/destinations.json';
import ThemeToggle from './components/ThemeToggle';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';
import SkipLink from './components/SkipLink';
import { ThemeProvider, FavoritesProvider, TripProvider } from './contexts';
import type { DestinationsData } from './types/destination';

// Lazy load route components
const DestinationList = lazy(() => import('./components/DestinationList'));
const DestinationDetail = lazy(() => import('./components/DestinationDetail'));
const TripPlanner = lazy(() => import('./components/TripPlanner/TripPlanner'));

// Type assertion for JSON import
const typedDestinationsData = destinationsData as DestinationsData;

// Loading fallback component
const LoadingFallback = () => (
  <div className="App-loading" role="status" aria-live="polite">
    <div className="App-loadingSpinner" aria-hidden="true"></div>
    <p>Loading...</p>
  </div>
);

const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <TripProvider>
          <Router>
            <PWAUpdatePrompt />
            <div className="App">
              <SkipLink />
              <ThemeToggle />
              <header className="App-header" role="banner">
                <h1 className="main-title">
                  Top 25 Must-See Places – Find Your Perfect Season
                </h1>
                <nav aria-label="Main navigation">
                  <Link to="/trip-planner" className="App-tripPlannerLink">
                    Trip Planner
                  </Link>
                </nav>
              </header>

              <main id="main-content" tabIndex={-1}>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <DestinationList destinations={typedDestinationsData.destinations} />
                      }
                    />

                    <Route
                      path="/destination/:name"
                      element={
                        <DestinationDetail destinations={typedDestinationsData.destinations} />
                      }
                    />

                    <Route
                      path="/trip-planner"
                      element={
                        <TripPlanner destinations={typedDestinationsData.destinations} />
                      }
                    />

                    <Route
                      path="*"
                      element={
                        <div className="App-notFound">
                          <h2>404 - Page Not Found</h2>
                          <p>The page you&apos;re looking for doesn&apos;t exist.</p>
                          <Link to="/" className="App-backLink">
                            &larr; Back to Home
                          </Link>
                        </div>
                      }
                    />
                  </Routes>
                </Suspense>
              </main>
            </div>
          </Router>
        </TripProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
