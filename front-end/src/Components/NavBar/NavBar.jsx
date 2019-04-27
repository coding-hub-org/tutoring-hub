import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import Contact from "../Contact/Contact";

import tutoringHubLogo from "../../Assets/tutoring-hub-logo.png";
import tutoringHubLogoNoText from "../../Assets/logo-no-text.svg";

const NavBar = props => {
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
};

export default NavBar;
