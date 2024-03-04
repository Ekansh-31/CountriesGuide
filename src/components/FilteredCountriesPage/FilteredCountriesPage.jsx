import React, { useState, useEffect, useContext} from 'react';
import './FilteredCountriesPage.css';
import { apiURL } from '../Util/api';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header/Header';
import { ThemeContext } from '../../App';

const FilteredCountriesPage = () => {
  const { theme } = useContext(ThemeContext);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { regionName } = useParams();

  const getCountryByRegion = async (regionName) => {
    try {
      const res = await fetch(`${apiURL}/region/${regionName}`);
      const cloneRes = res.clone();  
  
      const errorMessage = await cloneRes.text();
  
      if (!res.ok) {
        throw new Error(`Failed to fetch countries by region. Status: ${res.status}, Message: ${errorMessage}`);
      }
  
      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.error('Error in getCountryByRegion:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (regionName) {
        setIsLoading(true);
        console.log('Region Name:', regionName);
        await getCountryByRegion(regionName);
      }
    };

    fetchData();
  }, [regionName]);

  const sortedCountries = [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));

  return (
    <div className={`main `} id={theme}>
        <Header/>
      <button className={`backbutton`} id={theme}>
            <Link to="/">
              <FontAwesomeIcon className="icon" icon={faArrowLeft} />
            </Link>
            <Link to="/">Back</Link>
          </button>
      <div className="countrymain" id={theme}>
        {isLoading && !error && <h4>Loading....</h4>}
        {error && !isLoading && <h4>{error}</h4>}
        {sortedCountries.map((country) => (
          <Link to={`/country/${country.name.common}`} key={country.name.common}>
            <div className={`card`} id={theme} key={country.name.common}>
              <div className="image">
                <img src={country.flags.png} alt="" />
              </div>
              <div className={`data`} id={theme}>
                <h3>{country.name.common}</h3>
                <h6>{" "} Population:{" "} {new Intl.NumberFormat().format(country.population)}</h6>
                <h6>Region: {country.region}</h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilteredCountriesPage;