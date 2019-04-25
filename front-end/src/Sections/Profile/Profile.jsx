import React, { Component } from "react";
import "./Profile.css";
import loadingIcon from "../../Assets/loading-icon.png";
import { Link } from "react-router-dom";

// Import components
import NavBar from "../../Components/NavBar/NavBar";
import Title from "../../Components/Title/Title";
import Stats from "../../Components/Stats/Stats";
import Course from "../../Components/Course/Course";
import RatingCard from "../../Components/RatingCard/RatingCard";
import Subheading from "../../Components/Subheading/Subheading";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import NoReviews from "../../Assets/no-reviews.png";
import FormDropdown from "../../Components/FormDropdown/FormDropdown";
import FormSlider from '../../Components/FormSlider/FormSlider';

class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			loading: true,
			yes: 0,
			no: 0,
			filter_course: '',
			filter_rating: 0,
		};
	}

	getName() {
		return this.state.tutor.firstName + " " + this.state.tutor.lastName;
	}

	getBookAgain = (reviews, answer) => {
		let filtered;
		const book = reviews.map(review => {
			return review.bookAgain;
		});
		if (answer === 1) {
			filtered = book.filter(b => {
				return b === true;
			});
			return 100 / (book.length / filtered.length);
		} else {
			filtered = book.filter(b => {
				return b === false;
			});
			return 100 / (book.length / filtered.length);
		}
	};

	filterCourses = (course) => {
		this.setState({
			filter_course: course === "" ? "" : course,
		})
	}

	filterRatings = (rating) => {
		this.setState({
			filter_rating: rating,
		})
	}

	filterRatingsType = (type) => {
		this.setState({
			filter_rating_type: type,
		})
	}

	componentDidMount() {
		window.scrollTo(0, 0);

		fetch(`/api/v1${window.location.pathname}`)
			.then(response => response.json())
			.then(data => {
				this.setState({
					tutor: data,
					yes: this.getBookAgain(data.reviews, 1),
					no: this.getBookAgain(data.reviews, 0),

					loading: false,
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="profile-section">
				<NavBar />
				{this.state.loading ? (
					<div className="profile-section--wrapper">
						<div className="profile-section--wrapper-load">
							<img
								className={"profile-section--wrapper__loading"}
								src={loadingIcon}
								alt=""
							/>
						</div>
					</div>
				) : (
						<div className="profile-section--wrapper">
							<Title title={this.state.name} />
							<div className="profile-section--wrapper__upper">
								<div className={"profile-section--wrapper__upper--left"}>
									<img src={this.state.tutor.imageUrl} alt="" />
								</div>
								<div className={"profile-section--wrapper__upper--center"}>
									<Subheading title={"Overview:"} />
									<p>
										<span>MAJOR: </span>
										{this.state.tutor.major}
									</p>
									<p>
										<span>TUTOR SINCE: </span>
										{this.state.tutor.since}
									</p>
									<p>
										<span>REVIEWS: </span>
										{this.state.tutor.reviews.length}
									</p>
									<p>
										<span>WOULD BOOK AGAIN? :</span>
									</p>
									<div className={"profile-section--wrapper__book-again"}>
										<div>
											<p>
												<span>YES</span>
												{isNaN(this.state.yes.toFixed(1)) ? "N/A" : this.state.yes.toFixed(1) + "%"}
											</p>
										</div>
										<div>
											<p>
												<span>NO</span>
												{isNaN(this.state.yes.toFixed(1)) ? "N/A" : this.state.no.toFixed(1) + "%"}
											</p>
										</div>
									</div>
									<Subheading title={"Courses:"} />
									<Course courses={this.state.tutor.courses} />
								</div>
								<div className={"profile-section--wrapper__upper--right"}>
									<RatingCard reviews={this.state.tutor.reviews} />
								</div>
							</div>
							<Subheading title={"Stats:"} />
							<Stats reviews={this.state.tutor.reviews} />
							<div className={"profile-section--wrapper__reviews"}>
								<Subheading title={"Reviews:"} />
								<Link
									to={`/tutors/${this.state.tutor._id}/rate`}
									onClick={() => {
										document.getElementById("navbar").scrollIntoView();
									}}
								>
									REVIEW {this.getName().toUpperCase()}
								</Link>
							</div>

							<div className="Filters">
								<div>
									<span>Filters</span>
									<FormDropdown
										title={"Courses"}
										options={this.state.tutor.courses}
										onChange={this.filterCourses}
										value={this.state.filterCourse}
										uppercase={true}
									/>
								</div>
								<div>
									<span>Rating</span>
									<FormSlider
										min={0}
										max={10}
										step={1}
										onChange={this.filterRatings}
										value={this.state.filter_rating}
									/>
								</div>
							</div>

							{this.state.tutor.reviews.length === 0 ?
								<div className={"profile-section--wrapper__no-reviews"}>
									<img src={NoReviews} alt="" />
									<h3>
										{this.state.tutor.firstName} doesn't have any reviews yet. Be the first to review
									</h3>
								</div>
								:
								<ReviewCard
									tutor={this.state.tutor}
									filter_course={this.state.filter_course}
									filter_rating={this.state.filter_rating}
								/>
							}
						</div>
					)}
			</div>
		);
	}
}

export default Profile;
