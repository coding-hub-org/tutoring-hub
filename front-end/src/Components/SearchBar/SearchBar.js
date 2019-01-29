import React from "react";
import searchIcon from "../../Assets/search.svg";
import "./SearchBar.css";

const SearchBar = props => {
  return (
    <div className="searchbar-component">
      <div className="searchbar-component--icon">
        <img src={searchIcon} alt="Search" />
      </div>
      <div className="searchbar-component--description">
        <input type="text" placeholder="Search Tutor" />
      </div>
    </div>
  );
};

export default SearchBar;
