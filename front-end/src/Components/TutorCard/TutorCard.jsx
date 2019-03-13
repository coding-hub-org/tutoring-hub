import React from 'react';
import './TutorCard.css';
import { Link } from 'react-router-dom';
import starRating from '../../Assets/rating-star.svg';

class TutorCard extends React.Component {

    render() {
        const { tutors } = this.props;
        const getAvg = (ratings) => {
            let rating = 0, total, obj;

            if (ratings.length === 0) return -1;
            ratings.forEach(review => {
                obj = review.statistics;
                total = (obj.methodology + obj.organization + obj.preparation + obj.knowlege + obj.clarity) / 5;
                rating += total;
            });

            return rating / ratings.length;
        }
        const tutorList = tutors.map(tutor => {
            return (
                <div className={"tutorcard-component"} key={tutor._id}>
                    <img src={tutor.imageUrl} alt="" />
                    <div className={"tutorcard-component--content"}>
                        <p>{tutor.firstName + "  " + tutor.lastName}</p>
                        <p className={"tutorcard-component--content__description"}>
                            Jane is a chemistry tutor majoring in Medical Technologies with a minor in Math  and Biology.
                        </p>
                        <div className={"tutorcard-component--content__more"}>
                            <Link to={`/tutors/${tutor._id}`}>MORE</Link>
                            <div>
                                {
                                    (getAvg(tutor.reviews) === -1) ?
                                        <p>N/A</p> :
                                        <p>{getAvg(tutor.reviews).toFixed(2)}</p>
                                }
                                <img src={starRating} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div className={'tutorcard-component--wrapper'}>
                {tutorList}
            </div>
        );

    }
}

export default TutorCard;