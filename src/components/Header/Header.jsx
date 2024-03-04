import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import "./Header.css";
import { ThemeContext } from '../../App';



function Header() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <>
     <div className={`container`}>
        <div className="head">
            <h2>Where in the World?</h2>
        </div>
        <div className={`toggle`} onClick={toggleTheme}>
            {theme === 'light' ? <FontAwesomeIcon className='icon' icon={faMoon} size="lg"/> : <FontAwesomeIcon className='icon' icon={faSun} inverse size="lg" />}
            <p>{theme === 'light' ? "Dark Mode" : "Light Mode"}</p>
        </div>
     </div>
    </>
  )
}

export default Header

