import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Search from '../Search/Search';
import FilterCountry from '../FilterCountry/FilterCountry';
import FilteredCountriesPage from '../FilteredCountriesPage/FilteredCountriesPage';
import { ThemeContext } from '../../App';
import Header from '../Header/Header';



function Home() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('');
  const { toggleTheme, theme } = useContext(ThemeContext);
 

  const handleClick = (regionName) => {
    setSelectedRegion(regionName);
    navigate(`/region/${regionName}`);
  };


  return (
    <>
      <div className={`home ${theme}`} >
        <div id={theme}>
         <Header />
        </div>
          <div className={`middle`}>
            <h1>Welcome To Countries Guide Website</h1>
            <div className="menu">
              <div id={theme}>
              <Search/>
              </div>
              <div id={theme}>
              <FilterCountry onSelect={handleClick} />
              </div>
              <div id={theme}>
              {selectedRegion ? <FilteredCountriesPage /> : ''}
              </div>
            </div>
          </div>
      </div>

    </>
  )
}

export default Home