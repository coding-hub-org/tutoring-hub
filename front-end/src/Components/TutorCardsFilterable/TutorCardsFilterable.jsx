import React, { Component } from 'react'
import './TutorCardsFilterable.css';

import TutorCardPartial from '../TutorCardPartial/TutorCardPartial';
import TutorNotFound from '../TutorNotFound/TutorNotFound';


class TutorCardsFilterable extends Component {

    getRating = (ratings) => {
        let rating = 0, total, obj;

        if (ratings.length === 0) return -1;
        ratings.forEach(review => {
            obj = review.statistics;
            total = (obj.methodology + obj.organization + obj.preparation + obj.knowledge + obj.clarity) / 5;
            rating += total;
        });

        return rating / ratings.length;
    }

    render() {
        let tutors = this.props.tutors;

        tutors = tutors.filter(tutor => {
            var rating = this.getRating(tutor.reviews);
            return (this.props.filterCourse === '' || tutor.courses.includes(this.props.filterCourse)) &&
                (this.props.filterRating === 0 || rating >= this.props.filterRating) &&
                (this.props.filterName === '' || (tutor.firstName.toLowerCase() + " " + tutor.lastName.toLowerCase()).includes(this.props.filterName.toLowerCase()));
        }, this);

        let cards = tutors.map((tutor) =>
            <TutorCardPartial tutor={tutor} key={tutor._id} />
        );

        if (cards.length === 0) {
            return (
                <TutorNotFound />
            );
        }

        return (
            <div className={"Tutor-Cards-Component"}>
                {cards}
            </div>
        );
    }
}

export default TutorCardsFilterable;