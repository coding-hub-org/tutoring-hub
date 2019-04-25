import React, { Component } from "react";
import "./ReviewCard.css";

import NoReviews from "../../Assets/no-reviews.png";

class ReviewCard extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const reviewList = this.props.tutor.reviews.map(review => {
			let obj = review.statistics;
			let total =
				(obj.methodology +
					obj.organization +
					obj.preparation +
					obj.knowlege +
					obj.clarity) /
				5;

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
								<h3>{review.date.substring(0, 10)}</h3>
							</section>
							<p>{review.content}</p>
						</div>
					</div>
				</div>
			);
		});

		return <div>{reviewList}</div>;
	}
}
export default ReviewCard;
