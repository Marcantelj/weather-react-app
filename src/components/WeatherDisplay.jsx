function WeatherDisplay({loading, error, weather,city,isFahrenheit,onToggleUnit}) {

  // 🌤️ Translates Open-Meteo codes into clean text and an emoji icon
  function getWeatherDetails(code) {
    // If the code is missing or null, return a fallback
    if (code === undefined || code === null) return { label: 'Unknown', icon: '✨' };

    if (code === 0) return { label: 'Clear Sky', icon: '☀️' };
    if (code === 1 || code === 2 || code === 3) return { label: 'Partly Cloudy', icon: '⛅' };
    if (code === 45 || code === 48) return { label: 'Foggy Conditions', icon: '🌫️' };
    if (code === 51 || code === 53 || code === 55) return { label: 'Light Drizzle', icon: '🌦️' };
    if (code === 61 || code === 63 || code === 65) return { label: 'Steady Rain', icon: '🌧️' };
    if (code === 71 || code === 73 || code === 75) return { label: 'Snowfall', icon: '❄️' };
    if (code === 95 || code === 96 || code === 99) return { label: 'Thunderstorm', icon: '⛈️' };
    return { label: 'Unsettled Weather', icon: '🌪️' }; // Catch-all fallback
  }

    return(
    <div className="right-display-pane">
          {error && <p style={{ color: '#ef4444', fontSize: '14px' }}>⚠️ {error}</p>}

          {loading ? (
            <p style={{ display: 'flex', justifyContent: 'center', color:'#000' }}>Scanning global satellites...</p>
          ) : weather ? (
            <div className="weather-main">
              <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>CURRENT CONDITIONS</span>
              <h1 className="city-name" style={{ marginTop: '20px' }}>{city}</h1>

              {/* 👤 DYNAMIC WEATHER ICON PANEL */}
              <div style={{ textAlign: 'center', margin: '10px 0' }}>
                <div style={{ fontSize: '80px', lineHeight: '1' }}>
                  {getWeatherDetails(weather.weathercode).icon}
                </div>
                <p style={{ color: '#000', fontWeight: '600', margin: '5px 0 0 0', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '1px' }}>
                {getWeatherDetails(weather.weathercode).label}
                </p>
              </div>
              
              
              <div className="main-temp">
              {isFahrenheit 
                ? `${Math.round((weather.temperature * 9) / 5 + 32)}°F` 
              : `${Math.round(weather.temperature)}°C`
                }
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>CURRENT CONDITIONS</span>
  
                {/* The Unit Toggle Muscle Trigger */}
                <button onClick={onToggleUnit} className="tempSwitchBtn">Switch to {isFahrenheit ? '°C' : '°F'}</button>
              </div>

              <div className="weather-dashboard-grid">
                <div className="info-stat-block">
                  <span>Wind Speed</span>
                  <h3>{weather.windspeed} km/h</h3>
                </div>
                <div className="info-stat-block">
                  <span>Wind Direction</span>
                  <h3>{weather.winddirection}°</h3>
                </div>
                <div className="info-stat-block">
                  <span>Weather Code</span>
                  <h3>{weather.weathercode} (Clear/Cloudy)</h3>
                </div>
                <div className="info-stat-block">
                  <span>Status</span>
                  <h3>Active</h3>
                </div>
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#000' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🗺️</div>
              <p>Enter a city location on the left sidebar pane to query global meteorology tracking information.</p>
            </div>
          )}
        </div>
        );}

export default WeatherDisplay;