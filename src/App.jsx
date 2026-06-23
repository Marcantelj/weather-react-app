import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css'; // 🎨 Hooks up your layout and dark-mode styles!

function App() {
  // 🧠 THE BRAIN: App State (Global Memory Hub)
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  // 💪 THE MUSCLE: Fetch Weather Function
  // Co-ordinates the dual-layer API request flow to Open-Meteo
  async function fetchWeather(targetCity) {
    if (!targetCity.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // PHASE 1: Query the Geocoding API to resolve a textual city name into coordinates
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${targetCity}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found. Try another one!');
      }
      
      const { latitude, longitude, name } = geoData.results[0];
      
      // PHASE 2: Request meteorology dashboard statistics using the latitude and longitude
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const weatherData = await weatherRes.json();
      
      // PHASE 3: Save results back into global state to update the interface
      setCity(name);
      setWeather(weatherData.current_weather);
      
      // Update history pane state array (Keeping the 5 most recent unique lookups)
      if (!history.includes(name)) {
        setHistory([name, ...history].slice(0, 5)); 
      }
    } catch (err) {
      setError(err.message || 'Failed to sync weather satellite data.');
    } finally {
      setLoading(false);
    }
  }

  // 👤 THE FACE: Architectural Layout Grid
  return (
    <div className="dashboard-container">
      <div className="weather-card">
        
        {/* Branding Banner Header */}
        <div className="branding">
          <h2>🌤️ Global SkyTracker Pro</h2>
        </div>

        {/* 🎛️ LEFT COLUMN: Controls & History Side Pane */}
        {/* Sends downstream variables and the master function callback hooks */}
        <SearchBar 
          onSearchSubmit={fetchWeather}
          history={history} 
          fetchWeather={fetchWeather} 
        />

        <hr className="divider" />

        {/* 📺 RIGHT COLUMN: Big Weather Dashboard Displays */}
        {/* Downdrills global metrics states and the toggle function trigger */}
        <div className="right-display-pane">
          <WeatherDisplay 
            loading={loading}
            error={error}
            weather={weather}
            city={city}
            isFahrenheit={isFahrenheit}
            onToggleUnit={() => setIsFahrenheit(!isFahrenheit)}
          />
        </div>

      </div>
    </div>
  );
}

export default App;