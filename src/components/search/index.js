import React, { useState } from "react";
import { SEARCH_DATA } from "../../data/search";
import Loader from "../common/loader";
import "./search.css";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [timerId, setTimerId] = useState();

  const getResultsFromAPI = async (query) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${query}`
    );
    const data = await response.json();
    setResults(data);
    setShowLoader(false);
  };

  const getResultsFromLocalData = (query) => {
    const _resultsToShow = SEARCH_DATA.filter((item) =>
      item.name.official.toUpperCase().includes(query.toUpperCase())
    );
    setResults(_resultsToShow);
    setShowLoader(false);
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    setResults([]);

    if (e.target.value !== "") {
      setShowLoader(true);

      if (timerId) {
        clearTimeout(timerId);
      }
      setTimerId(setTimeout(() => getResultsFromAPI(e.target.value), 500));
    }
  };

  return (
    <div className="search">
      <div className="search-title">Searchbar</div>
      <div className="input-wrapper">
        <input
          className="search-input"
          value={searchText}
          onChange={handleSearchText}
        />
        <div className="input-search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-search"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </div>
        {results.length > 0 && (
          <div className="results-wrapper">
            {results.map((country) => (
              <div className="search-result">{country.name.official}</div>
            ))}
          </div>
        )}
        {showLoader && (
          <div className="results-wrapper">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
