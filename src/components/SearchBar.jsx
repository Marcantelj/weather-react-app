import React, {useState} from "react";

function SearchBar({onSearchSubmit, fetchWeather, history}) {
    const [input, setInput] = useState(''); 


    function handleSubmit(e) {
    e.preventDefault();    
    onSearchSubmit(input);
    setInput('');
}

    return (

    <div className="left-controls-pane">
        <h3>Search Location</h3>
        <form onSubmit={handleSubmit} className="search-form">
            <input 
              type="text"
              placeholder="Enter city name..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="search-input"
                />
            <button type="submit" className="search-btn">
              Search Location
            </button>
        </form>

        <h4 style={{ color: '#000', marginBottom: '10px', marginTop: '25px' }}>Recent Searches</h4>
        <div className="history-panel">
            {history.map((pastCity, index) => (
            <button
                key={index}
                onClick={() => fetchWeather(pastCity)}
                className="history-badge"
            >
            {pastCity}
            </button>
            ))}
            {history.length === 0 && <p style={{ color: '#000', fontSize: '13px', margin: 0 }}>No recent history</p>}
        </div>
    </div>
  );
}

export default SearchBar;