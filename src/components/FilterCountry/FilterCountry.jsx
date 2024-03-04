import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './FilterCountry.css';
import { ThemeContext } from '../../App';

const FilterCountry = ({ onSelect }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const regionName = e.target.value;
    onSelect(regionName);
    navigate(`/region/${regionName}`);
  };

  return (
    <>
      <select className={`select`} onChange={handleSelect}>
        <option>Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </>
  );
};

export default FilterCountry;