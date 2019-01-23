import React from 'react';
import './NavBar.css';

import tutoringHubLogo from '../../Assets/tutoring-hub-logo.png';
import Contact from '../Contact/Contact';

const NavBar = () => {
    return(
        <nav className={"navbar-component"}>
            <img src={tutoringHubLogo} alt="tutoring hub logo"/>
            <Contact/>
        </nav>
    );
}

export default NavBar;