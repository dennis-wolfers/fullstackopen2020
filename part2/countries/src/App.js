import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

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

    return (
      <>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map((language) => (
            <li>
              {language.name} ({language.nativeName})
            </li>
          ))}
        </ul>
        <img src={country.flag} alt="flag" />
      </>
    );
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
    <>
      {props.countries.map((country) => (
        <p key={country.name}>{country.name}</p>
      ))}
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
    (country) => country.name.toLowerCase().indexOf(filter) > -1
  );

  return (
    <div>
      <Filter filter={filter} onChange={() => handleFilterChange} />
      <FilteredCountries countries={filteredCountries} />
    </div>
  );
}

export default App;
