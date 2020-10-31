import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Button = (props) => (
  <div>
    <button id={props.id} onClick={props.handleClick}>
      {props.text}
    </button>
  </div>
);

const Filter = (props) => {
  return (
    <>
      <form>
        <div>
          find countries{" "}
          <input value={props.filter} onChange={props.onChange()} />
        </div>
      </form>
    </>
  );
};

const FilteredCountries = (props) => {
  if (props.countries.length === 1) {
    let country = props.countries[0];

    return <Country country={country} />;
  }

  if (props.countries.length > 10) {
    return (
      <p>{props.countries.length} country names contain your filter string.</p>
    );
  }

  if (props.countries.length === 0) {
    return <p>No matches.</p>;
  }

  return (
    <div>
      {props.countries.map((country) => (
        <div key={country.name}>
          <p>{country.name}</p>
          <Button
            id={country.name}
            handleClick={props.handleClick()}
            text="show"
          />
        </div>
      ))}
    </div>
  );
};

const Country = (props) => {
  const country = props.country;
  const [weather, setWeather] = useState([])
  const [weatherImages, setWeatherImages] = useState([])
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get("http://api.weatherstack.com/current?access_key=" + apiKey + "&query=" + country.name).then((response) => {
      setWeather(response.data.current);
      setWeatherImages(response.data.current.weather_icons)
    });
  }, []);

  return (
    <>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>
            {language.name} ({language.nativeName})
          </li>
        ))}
      </ul>
      <img src={country.flag} alt="flag" />
      <h3>Weather in {country.capital}</h3>
      <img src={weatherImages[0]} alt="weather depiction" />
      <p>temperature: {weather.temperature}&deg;c</p>
      <p>wind: {weather.wind_speed} kph from the {weather.wind_dir}</p>
    </>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredCountries = countries.filter(
    (country) => country.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
  );

  const handleClick = (event) => {
    setFilter(event.target.id);
  };

  return (
    <div>
      <Filter filter={filter} onChange={() => handleFilterChange} />
      <FilteredCountries
        handleClick={() => handleClick}
        countries={filteredCountries}
      />
    </div>
  );
}

export default App;
