import React, { Component } from "react";
import "./TutorCardPartial.css";

import { Link } from "react-router-dom";
import starRating from "../../Assets/rating-star.svg";

class TutorCardPartial extends Component {

	getFullName() {
		return this.props.tutor.firstName + " " + this.props.tutor.lastName;
	}

	getAvg = (ratings) => {
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
		// console.log(this.props.tutor);
		const courses_list = this.props.tutor.courses
			.slice(0, 7)
			.map((course, index) => <li key={"tutor-" + index}>{course}</li>);

		return (
			<div className={"Tutor-Card-Partial-Component"}>
				<img
					src={this.props.tutor.imageUrl}
					alt={"Image of " + this.getFullName()}
				/>

				<div className={"content"}>
					<p className="full-name">{this.getFullName()}</p>
					<div className="bio">
						{courses_list}
						{this.props.tutor.courses.length > 7
							? "+" + (this.props.tutor.courses.length - 7).toString()
							: ""}
					</div>

					<div className="bottom">
						<Link to={`/tutors/${this.props.tutor._id}`}>MORE</Link>
						<span className="rating">
							{this.getAvg(this.props.tutor.reviews) === -1 ? (
								<span>N/A</span>
							) : (
									<span>{this.getAvg(this.props.tutor.reviews).toFixed(2)}</span>
								)}
							<img src={starRating} alt="star rating" />
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default TutorCardPartial;