import React, { Component } from 'react'
import './TutorNotFound.css';

import tutorNotFound from '../../Assets/tutor-not-found.png';

class TutorNotFound extends Component {

    render() {
        return (
            <div className={"Tutor-Not-Found-Component"}>
                <img src={tutorNotFound} alt="Tutor not found" />
                <p>Sorry, we couldn't find any matching tutors.</p>
            </div>
        );
    }
}

export default TutorNotFound;