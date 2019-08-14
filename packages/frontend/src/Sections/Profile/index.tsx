import React, { Component } from "react";
import "./style.scss";
import loadingIcon from "../../Assets/loading-icon.png";
import tutorSince from "../../Assets/tutor-since-img.svg";

import reviewsCount from "../../Assets/reviews-count.svg";
import reviewsNegative from "../../Assets/reviews-negative.svg";
import reviesPositive from "../../Assets/reviews-positive.svg";

import { Link } from "react-router-dom";

// Import components
import NavBar from "../../Components/NavBar";
import Title from "../../Components/Title";
import Stats from "../../Components/Stats";
import Course from "../../Components/Course";
import RatingCard from "../../Components/RatingCard";
import Subheading from "../../Components/Subheading";
import ReviewCard from "../../Components/ReviewCard";
import NoReviews from "../../Assets/no-reviews.png";
import FormDropdown from "../../Components/FormDropdown";
import FormSlider from "../../Components/FormSlider";
import { connect } from "react-redux";
import { filterReviewsByCourse } from "../../actions/tutorActions";

import { RouteComponentProps } from "react-router-dom";

interface ProfileProps extends RouteComponentProps {
	tutor: any;
	test: any;
	isLoading: boolean;
	loading: boolean;
	filterCourse: string;
	filterReviewsByCourse: Function;
}

class Profile extends Component<ProfileProps> {
	constructor(props: ProfileProps) {
		super(props);
	}

	getName = () => {
		return this.props.tutor.firstName + " " + this.props.tutor.lastName;
	};

	getBookAgainPercentages = (reviews: any[]) => {
		let yes = 0;
		let no = 0;
		const wouldBook = reviews.map(review => {
			return review.bookAgain;
		});

		wouldBook.forEach(answer => {
			answer ? yes++ : no++;
		});

		yes = (yes * 100) / wouldBook.length;
		no = (no * 100) / wouldBook.length;

		return { yes, no };
	};

	filterCourses = (course: string) => {
		this.props.filterReviewsByCourse(course);
	};

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		console.log("PROFIEL", this.props);
		return (
			<div className="profile-section">
				<NavBar />
				{this.props.isLoading ? (
					<div className="profile-section--wrapper">
						<div className="profile-section--wrapper-load">
							<img
								className={"profile-section--wrapper__loading"}
								src={loadingIcon}
								alt="Loading Tutoring Hub"
							/>
						</div>
					</div>
				) : (
					<div className="profile-section--wrapper">
						<div className="profile-section--wrapper__upper">
							<div className={"profile-section--wrapper__upper--left"}>
								<img src={this.props.tutor.imageUrl} alt="" />
							</div>
							<div className={"profile-section--wrapper__upper--center"}>
								<Title title={this.getName()} />
								<p className="profile-major">{this.props.tutor.major}</p>

								<div className={"tutor-since"}>
									<img src={tutorSince} alt="tutor since" />
									<p>
										Tutor since{" "}
										{this.props.tutor.since.substr(5) +
											" " +
											this.props.tutor.since.substr(0, 4)}
									</p>
								</div>
								<section className={"tutor-rating-stats"}>
									<div className={"tutor-rating-stats--reviews"}>
										<img src={reviewsCount} alt="total reviews" />
										<p>
											<span>{this.props.tutor.reviews.length} </span>Total
											Reviews
										</p>
									</div>
									<div className={"tutor-rating-stats--positive"}>
										<img src={reviesPositive} alt="positive reviews" />
										{!this.getBookAgainPercentages(this.props.tutor.reviews)
											.yes ? (
											<p>N/A</p>
										) : (
											<p>
												<span>
													{this.getBookAgainPercentages(
														this.props.tutor.reviews
													).yes.toFixed(1)}{" "}
													%{" "}
												</span>
												would book again
											</p>
										)}
									</div>
									<div className={"tutor-rating-stats--negative"}>
										<img src={reviewsNegative} alt="negative reviews" />
										{!this.getBookAgainPercentages(this.props.tutor.reviews)
											.no ? (
											<p>N/A</p>
										) : (
											<p>
												<span>
													{this.getBookAgainPercentages(
														this.props.tutor.reviews
													).no.toFixed(1)}
													%
												</span>
												wouldn't book again
											</p>
										)}
									</div>
								</section>
							</div>
							<div className={"profile-section--wrapper__upper--right"}>
								<RatingCard reviews={this.props.tutor.reviews} />
							</div>
						</div>
						<Subheading title={"Courses"} />
						<Course courses={this.props.tutor.courses} />
						<Subheading title={"Stats"} />
						<Stats reviews={this.props.tutor.reviews} />
						<div className={"profile-section--wrapper__reviews"}>
							<Subheading title={"Reviews"} />
						</div>
						<div className="Filters-course">
							<div>
								<span>Filters review</span>
								<FormDropdown
									title={"Courses"}
									options={this.props.tutor.courses}
									onChange={this.filterCourses}
									value={this.props.filterCourse}
									uppercase={true}
								/>
							</div>
							<Link
								to={`/tutors/${this.props.tutor._id}/review`}
								onClick={() => {
									document.getElementById("navbar")!.scrollIntoView();
								}}
							>
								REVIEW {this.getName().toUpperCase()}
							</Link>
						</div>
						{this.props.tutor.reviews.length === 0 ? (
							<div className={"profile-section--wrapper__no-reviews"}>
								<img src={NoReviews} alt="" />
								<h3>
									{this.props.tutor.firstName} doesn't have any reviews yet. Be
									the first to review
								</h3>
							</div>
						) : (
							<ReviewCard
								tutor={this.props.tutor}
								filterCourse={this.props.filterCourse}
							/>
						)}
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: any, props: any) => {
	let tutorId = props.match.params.id;

	return {
		// tutor: state.tutor.tutor,
		filterCourse: state.tutor.filterCourse,
		loading: state.tutor.loading,
		isLoading: state.home.isLoading,
		tutor: state.home.tutors.find((t: { _id: any }) => t._id === tutorId)
	};
};

const mapDispatchToProps = (dispatch: Function) => {
	return {
		filterReviewsByCourse: (course: string) =>
			dispatch(filterReviewsByCourse(course))
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
