import React, { Component } from "react";
import './ReviewCard.css';

import NoReviews from "../../Assets/no-reviews.png";

class ReviewCard extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        console.log(this.props);
        const course_filter_reviews = this.props.filter_course === '' ?
            this.props.tutor.reviews
            :
            this.props.tutor.reviews.filter(review => {
                return review.course === this.props.filter_course;
            });

        // const rating_filter_reviews = this.props.filter_rating === 0 ?
        //     course_filter_reviews
        //     :
        //     course_filter_reviews.filter(review => {
        //         let obj = review.statistics;
        //         let total = (obj.methodology + obj.organization + obj.preparation + obj.knowlege + obj.clarity) / 5;
        //         return total >= this.props.filter_rating;
        //     })

        const filtered_review = course_filter_reviews;
        console.log(filtered_review);
        const reviewList = filtered_review.map(review => {
            let obj = review.statistics;
            let total = (obj.methodology + obj.organization + obj.preparation + obj.knowlege + obj.clarity) / 5;

            return (
                <div className={"reviewcard-component"} key={review._id}>
                    <div className={"reviewcard-component--wrapper"}>
                        <div className={"reviewcard-component--wrapper__rating"}>
                            <p>RATING</p>
                            <h1>{total}</h1>
                        </div>
                        <div className={"reviewcard-component--wrapper__description"}>
                            <h1>{review.author}</h1>
                            <section className={"reviewcard-component--details"}>
                                <h3>{review.course}</h3>
                                <h3>{(review.date).substring(0, 10)}</h3>
                            </section>
                            <p>{review.content}</p>
                        </div>
                    </div>
                </div>
            )
        });

        if (reviewList.length === 0)
            return (
                <div className={"profile-section--wrapper__no-reviews"}>
                    <img src={NoReviews} alt="" />
                    <h3>
                        {this.props.tutor.firstName} doesn't have any reviews yet. Be the first to review
                    </h3>
                </div>
            )

        return (
            <div>
                {reviewList}
            </div>
        );
    }
}
export default ReviewCard;