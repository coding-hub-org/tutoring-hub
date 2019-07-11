import React from "react";
import searchIcon from "../../Assets/search.svg";
import "./style.scss";

interface Props {
  handleSearch: any;
}

export default function SearchBar(props: Props) {

  const searchTutor = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleSearch(event);
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