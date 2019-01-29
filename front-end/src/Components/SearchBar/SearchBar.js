import React from "react";
import searchIcon from "../../Assets/search.svg";
import "./SearchBar.css";

const SearchBar = ({handleSearch}) => {
  const searchTutor = (e) => {
    handleSearch(e);
  }
  return (
    <div className="searchbar-component">
      <div className="searchbar-component--icon">
        <img src={searchIcon} alt="Search" />
      </div>
      <div className="searchbar-component--description">
        <input onChange={searchTutor} type="text" placeholder="Search Tutor" />
      </div>
    </div>
  );
};

export default SearchBar;
