import React, { Component } from "react";
import "./style.scss";

import { Link } from "react-router-dom";
import starRating from "../../Assets/rating-star.svg";
import moreImg from "../../Assets/more-img.svg";
import { getAverageScore } from "../../helpers/tutorsHelper";

interface TutorCardPartialProps {
	tutor?: any;
}

const TutorCardPartial: React.FC<TutorCardPartialProps> = props => {
	const getFullName = () => {
		return props.tutor.firstName + " " + props.tutor.lastName;
	};

	// console.log(this.props.tutor);
	const coursesList = props.tutor.courses
		.slice(0, 7)
		.map((course: string, index: number) => <li key={index}>{course}</li>);

	const tooltipCoursesList =
		props.tutor.courses.length > 7
			? props.tutor.courses
					.slice(7, props.tutor.courses.length)
					.map((course: string, index: number, j: any[]) => (
						<span key={index}>
							{index < j.length - 1 ? course + ", " : course}
						</span>
					))
			: null;

	return (
		<div className={"Tutor-Card-Partial-Component"}>
			<img src={props.tutor.imageUrl} alt={"Image of " + getFullName()} />

			<div className={"content"}>
				<p className="full-name">{getFullName()}</p>
				<div className="bio">
					{coursesList}
					{tooltipCoursesList ? (
						<li className="tooltip">
							{props.tutor.courses.length > 7
								? "+ " + (props.tutor.courses.length - 7).toString()
								: ""}
							<div className="tooltip-content">{tooltipCoursesList}</div>
						</li>
					) : null}
				</div>

				<div className="bottom">
					<span className="rating">
						<img src={starRating} alt="star rating" />
						{getAverageScore(props.tutor.reviews) === -1 ? (
							<span>N/A</span>
						) : (
							<span>{getAverageScore(props.tutor.reviews).toFixed(2)}</span>
						)}
					</span>
					<span className="more">
						<img src={moreImg} alt="more icon" />
						<Link to={`/tutors/${props.tutor._id}`}>MORE</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default TutorCardPartial;
