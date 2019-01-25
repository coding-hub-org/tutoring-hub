import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';

import tutoringHubLogo from '../../Assets/tutoring-hub-logo.png';
import Contact from '../Contact/Contact';

const NavBar = () => {
    return(
        <nav className={"navbar-component"}>
            <div className={"navbar-component--wrapper"}>        
                <Link to="/"><img src={tutoringHubLogo} alt="tutoring hub logo"/></Link>
                <Contact/>
            </div>
        </nav>
    );
}

export default NavBar;