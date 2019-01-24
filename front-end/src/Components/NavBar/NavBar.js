import React from 'react';
import './NavBar.css';

import tutoringHubLogo from '../../Assets/tutoring-hub-logo.png';
import Contact from '../Contact/Contact';

const NavBar = () => {
    return(
        <nav className={"navbar-component"}>
            <div className={"navbar-component--wrapper"}>        
                <a href="/"><img src={tutoringHubLogo} alt="tutoring hub logo"/></a>
                <Contact/>
            </div>
        </nav>
    );
}

export default NavBar;