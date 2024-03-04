import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { apiURL } from '../Util/api';
import { Link } from 'react-router-dom';
import './CountryInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header/Header';
import { ThemeContext } from '../../App';


const CountryInfo = () => {
  const { theme } = useContext(ThemeContext);
  const [countryDetails, setCountryDetails] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { countryName } = useParams();

  
  const getFirstValue = (obj) => {
    if (obj) {
      return Array.isArray(obj) ? obj[0] : obj[Object.keys(obj)[0]];
    }
    return null;
  };

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);
      if (!res.ok) throw new Error('Country Not Found!!');
      const data = await res.json();

      // Find the exact match based on the country name
      const exactMatch = data.find((country) => country.name.common === countryName);

      if (exactMatch) {
        setCountryDetails(exactMatch);
        console.log(exactMatch);
        setIsLoading(false);
      } else {
        throw new Error('Country Not Found!!');
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      await getCountryByName(countryName);
    })();
  }, [countryName]);


  return (
    <>
      <div className={`country_info_wrapper`} id={theme}>
      <Header/>
      <div className="btn">
          <button className={`button`} id={theme}>
            <Link to="/">
              <FontAwesomeIcon className="icon" icon={faArrowLeft} />
            </Link>
            <Link to="/">Back</Link>
          </button>
          <button className={`weatherbtn`} id={theme}>
            <Link to={`/weather/${countryName}`}>Weather</Link>
          </button>
        </div>
        {isLoading && !error && <h4>Loading....</h4>}
        {error && !isLoading && <h4>{error}</h4>}

        {!isLoading && !error && (
          <div className="country_container">
            <div className="country_img">
              <img src={countryDetails.flags?.png} alt="" />
            </div>
            <div className={`country_info`}>
              <h3>{countryDetails.name?.common}</h3>
              <div className={`country_info_left`}>
                <div className='first'>
                  <h5>Population: <span>{countryDetails.population?.toLocaleString()}</span></h5>
                  <h5>Region: <span>{countryDetails.region}</span></h5>
                  <h5>Sub Region: <span>{countryDetails.subregion}</span></h5>
                  <h5>Capital: <span>{countryDetails.capital}</span>{" "}</h5>
                </div>
                <div className='second'>
                  <h5>Currencies: <span>{getFirstValue(countryDetails.currencies)?.name}</span></h5>
                  <h5>Languages: <span>{Object.values(countryDetails.languages).join(', ')}</span></h5>
                  <h5>Top Level Domain: <span>{getFirstValue(countryDetails.tld)}</span></h5>
                </div>
              </div>
              <div className={`border`} id={theme}>
                  <h5 className='borderh5'>Border Countries: <span>{countryDetails.borders?.map((border) => (
                      <ul key={border}>
                        <li>{border}</li>
                      </ul>
                    ))}</span></h5> 
                </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CountryInfo
