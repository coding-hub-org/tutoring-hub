import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

import tutoringHubLogo from "../../Assets/tutoring-hub-logo.png";
import Contact from "../Contact/Contact";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ({handleSearch}) => {
  return (
    <nav className={"navbar-component"}>
      <div className={"navbar-component--wrapper"}>
        <Link to="/">
          <img src={tutoringHubLogo} alt="tutoring hub logo" />
        </Link>
        <SearchBar handleSearch={handleSearch}/>
        <Contact />
      </div>
    </nav>
  );
};

export default NavBar;
