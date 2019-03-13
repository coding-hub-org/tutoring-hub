import React, { Component } from 'react'
import './TutorCards.css';

import TutorCardPartial from '../TutorCardPartial/TutorCardPartial';

class TutorCards extends Component {

    render() {

        const tutors = this.props.tutors.map((tutor) =>
            <TutorCardPartial tutor={tutor} key={tutor._id}/>
        );

        return (
            <div className={"Tutor-Cards-Component"}>
                {tutors}
            </div>
        );
    }
}

export default TutorCards;