import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import Contact from "../Contact/Contact";
import UserBox from "../UserBox/UserBox";

import tutoringHubLogo from "../../Assets/tutoring-hub-logo.png";

const NavBar = (props) => {
  return (
    <nav id={"navbar"} className={"navbar-component"}>
      <div className={"navbar-component--wrapper"}>
        <Link to="/">
          <img src={tutoringHubLogo} alt="Tutoring Hub Logo" />
        </Link>
        {props.searchable &&
          <SearchBar handleSearch={props.handleSearch} />
        }
        {/* <Contact /> */}
        <UserBox />
      </div>
    </nav>
  );
};

export default NavBar;
