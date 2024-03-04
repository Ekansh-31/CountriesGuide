import './App.css';
import CountryInfo from './components/CountryInfo/CountryInfo';
import FilteredCountriesPage from './components/FilteredCountriesPage/FilteredCountriesPage';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { createContext, useState } from 'react';
import Weather from './Weather/Weather';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = ()=>{
    setTheme((curr)=>(curr === 'light'? 'dark': "light"));
  }
  return (
    <>
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <Router>
        <Routes>
          <Route path="/" element={<div id={theme}>
            <Home/>
            </div>} />
          <Route path="/country/:countryName" element={<div id={theme}>
            <CountryInfo />
          </div>} />
          <Route path="/region/:regionName" element={<div id={theme}>
            <FilteredCountriesPage />
          </div>} />
          <Route path="/weather/:countryName" element={<Weather />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
    </>
  );
}

export default App;
