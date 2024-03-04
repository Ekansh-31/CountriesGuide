import React, { useState ,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Search.css';
import { ThemeContext } from '../../App';


const Search = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate(); 
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e)=>{
    if(e.key === 'Enter'){
      const countryName = input.split(' ').map(word => word.charAt(0).toUpperCase()+word.slice(1)).join(' ');  //in this the split will seperate the input string into two words from the space in between and put it into an array.then we are using the map function to take all the elements from array and perform the capitalize operation where the first letter is capitalize using the .charAt(0).toUpperCase function and then rest of the string will get joined by using the + operator.then we are using the .join(' ) function to join both the words inside the array with a space in between.
      navigate(`/country/${countryName}`)
    }
  } 

  return (
    <form className={`form`}>
       {theme === 'light' ? <FontAwesomeIcon className='icon' icon={faSearch} /> : <FontAwesomeIcon className='icon' inverse icon={faSearch}/>}
      <input className={`input`}
        type="text"
        placeholder="Search a Country........."
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};

export default Search;

