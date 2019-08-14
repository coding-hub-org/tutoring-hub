import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar";
import Contact from "../Contact";

import tutoringHubLogo from "../../Assets/tutoring-hub-logo.png";
import tutoringHubLogoNoText from "../../Assets/logo-no-text.svg";

interface Props {
  sticky?: boolean;
  searchable?: boolean;
  handleSearch?: any;
}

export default function NavBar(props: Props) {
  return (
    <nav
      id={"navbar"}
      className={"navbar-component " + (props.sticky ? "sticky" : "")}
    >
      <div className={"navbar-component--wrapper"}>
        <Link to="/">
          <img
            src={tutoringHubLogoNoText}
            className="logo-notext"
            alt="Tutoring Hub Logo"
          />{" "}
          <img src={tutoringHubLogo} alt="Tutoring Hub Logo" />
        </Link>
        {props.searchable && <SearchBar handleSearch={props.handleSearch} />}
        <Contact />
      </div>
    </nav>
  );
}
