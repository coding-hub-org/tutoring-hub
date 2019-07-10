import React from 'react';

import githubIcon from '../../Assets/github_ic.svg';
import linkedinIcon from '../../Assets/linkedin_ic.svg';
import gmailIcon from '../../Assets/gmail_ic.svg';
import codepenIcon from '../../Assets/codepen_ic.svg';

import './style.scss';

export default function Contact() {
    return (
        <div className={"contact-component"}>
            <img src={gmailIcon} alt="Gmail logo" />
            <img src={githubIcon} alt="Github logo" />
            <img src={linkedinIcon} alt="LinkedIn logo" />
            <img src={codepenIcon} alt="Codepen logo" />
        </div>
    );
}