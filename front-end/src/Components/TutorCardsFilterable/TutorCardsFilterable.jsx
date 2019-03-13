import React, { Component } from 'react'
import './TutorCardsFilterable.css';

import TutorCardPartial from '../TutorCardPartial/TutorCardPartial';

class TutorCardsFilterable extends Component {

    render() {


        let tutors = this.props.tutors.filter(tutor => {
            if (this.props.filterCourse === '') return true;

            return tutor.courses.includes(this.props.filterCourse);
        });

        let cards = tutors.map((tutor) =>
            <TutorCardPartial tutor={tutor} key={tutor._id} />
        );

        return (
            <div className={"Tutor-Cards-Component"}>
                {cards}
            </div>
        );
    }
}

export default TutorCardsFilterable;