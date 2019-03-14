import React, { Component } from 'react'
import './TutorCardsFilterable.css';

import TutorCardPartial from '../TutorCardPartial/TutorCardPartial';

class TutorCardsFilterable extends Component {

    getRating = (ratings) => {
        let rating = 0, total, obj;

        if (ratings.length === 0) return -1;
        ratings.forEach(review => {
            obj = review.statistics;
            total = (obj.methodology + obj.organization + obj.preparation + obj.knowlege + obj.clarity) / 5;
            rating += total;
        });

        return rating / ratings.length;
    }

    render() {

        let tutors = this.props.tutors.filter(tutor => {
            var rating = this.getRating(tutor.reviews);
            console.log("Rating: " + this.props.filterRating);
            return (
                tutor.courses.includes(this.props.filterCourse) ||
                (rating !== -1 && rating >= this.props.filterRating)
            );
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