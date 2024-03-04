import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Weather.css';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [wicon, setWicon] = useState(cloud_icon);
  const [searchQuery, setSearchQuery] = useState('');
  const { countryName } = useParams();
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchWeatherData = async () => {
      let url;
      if (countryName) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&units=Metric&appid=${api_key}`;
      } else if (searchQuery) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=Metric&appid=${api_key}`;
      } else {
        return;
      }
      let res = await fetch(url);
      let data = await res.json();
      setWeatherData(data);
      updateWeatherIcon(data.weather[0].icon);
    };

    fetchWeatherData();
  }, [countryName, searchQuery, api_key]);

  const updateWeatherIcon = (icon) => {
    if (icon === '01d' || icon === '01n') {
      setWicon(clear_icon);
    } else if (icon === '02d' || icon === '02n') {
      setWicon(cloud_icon);
    } else if (icon === '03d' || icon === '03n' || icon === '04d' || icon === '04n') {
      setWicon(drizzle_icon);
    } else if (icon === '09d' || icon === '09n' || icon === '10d' || icon === '10n') {
      setWicon(rain_icon);
    } else if (icon === '13d' || icon === '13n') {
      setWicon(snow_icon);
    } else {
      setWicon(cloud_icon);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = () => {
    if (searchQuery) {
      navigate(`/weather/${searchQuery}`);
    }
  };

  return (
    <div className="weather">
      <div className="container">
        <div className="top-bar">
          <button className='wetbtn' onClick={handleBack}>
            <FontAwesomeIcon className="icon" icon={faArrowLeft} />
          </button>
          <input type="text" className='cityInput' placeholder='Search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <div className="search-icon" onClick={handleSearch}>
            <FontAwesomeIcon className='icon' icon={faSearch} />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">{weatherData && Math.floor(weatherData.main.temp)}°c</div>
        <div className="weather-location">{weatherData && weatherData.name}</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className='icon' />
            <div className="data">
              <div className="humidity-percent">{weatherData && weatherData.main.humidity}%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className='icon' />
            <div className="data">
              <div className="wind-rate">{weatherData && Math.floor(weatherData.wind.speed)} km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;