import React, { Component } from "react";
import "./style.scss";
import ratingStar from "../../Assets/rating-star.svg";

import NoReviews from "../../Assets/no-reviews.png";

import _ from "underscore";

interface Props {
	filterCourse?: string;
	tutor?: any;
}

interface State {}

export default class ReviewCard extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		console.log(this.props);
		const course_filter_reviews =
			this.props.filterCourse === ""
				? this.props.tutor.reviews
				: this.props.tutor.reviews.filter((review: any) => {
						return review.course === this.props.filterCourse;
				  });

		// const rating_filter_reviews = this.props.filter_rating === 0 ?
		//     course_filter_reviews
		//     :
		//     course_filter_reviews.filter(review => {
		//         let obj = review.statistics;
		//         let total = (obj.methodology + obj.organization + obj.preparation + obj.knowledge + obj.clarity) / 5;
		//         return total >= this.props.filter_rating;
		//     })

		const filtered_review = course_filter_reviews;
		console.log(filtered_review);

		_.sortBy(filtered_review, "date");
		filtered_review.reverse();
		const reviewList = filtered_review.map((review: any) => {
			let obj = review.statistics;
			let total =
				(obj.methodology +
					obj.organization +
					obj.preparation +
					obj.knowledge +
					obj.clarity) /
				5;

			return (
				<div className={"reviewcard-component"} key={review._id}>
					<div className={"reviewcard-component--wrapper"}>
						<div className={"reviewcard-component--wrapper__description"}>
							<div className={"review-title"}>
								<div>
									<h1>{review.author.toUpperCase()}</h1>
									<h3>{review.course}</h3>
								</div>
								<div>
									<img src={ratingStar} alt="Rating star" />
									<p>{total}</p>
								</div>
							</div>
							<section className={"reviewcard-component--details"}>
								<h3>{review.date.substring(0, 10)}</h3>
							</section>
							<p>{review.content}</p>
						</div>
					</div>
				</div>
			);
		});

		if (reviewList.length === 0)
			return (
				<div className={"profile-section--wrapper__no-reviews"}>
					<img src={NoReviews} alt="" />
					<h3>
						{this.props.tutor.firstName} doesn't have any reviews yet. Be the
						first to review
					</h3>
				</div>
			);

		return <div>{reviewList}</div>;
	}
}
