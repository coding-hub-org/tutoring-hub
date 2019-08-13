import React, { Component } from "react";
import "./style.scss";
import titleImg from "../../Assets/title-img.svg";

// Import components
import NavBar from "../../Components/NavBar";
import Title from "../../Components/Title";
import TutorCards from "../../Components/TutorCards";
import TutorCardsFilterable from "../../Components/TutorCardsFilterable";
import FormDropdown from "../../Components/FormDropdown";
import FormSlider from "../../Components/FormSlider";
import FormButton from "../../Components/FormButton";
import AddTutorBox from "../../Components/AddTutorBox";
import ReviewWebsiteButton from "../../Components/ReviewWebsite";

// Redux
import { connect } from "react-redux";
import {
	getTutors,
	getCourses,
	resetFilters,
	filterTutorsByCourse,
	searchTutor,
	filterTutorsByRating
} from "../../actions/homeActions";

import _ from "underscore";

interface TutorsProps {
	courses: string[];
	filterName: string;
	filterCourse: string;
	filterRating: number;
	filterTutorsByCourse: Function;
	filterTutorsByRating: Function;
	getCourses: Function;
	getTutors: Function;
	resetFilters: Function;
	searchTutor: Function;
	isLoading: boolean;
	title: string;
	tutors: any[];
}

class Tutors extends Component<TutorsProps> {
	constructor(props: TutorsProps) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.resetFilters = this.resetFilters.bind(this);
		this.filterCourses = this.filterCourses.bind(this);
		this.filterRatings = this.filterRatings.bind(this);
	}

	componentDidMount() {
		this.props.getTutors();
		this.props.getCourses();
	}

	handleSearch(e: any) {
		let name = e.currentTarget.value;
		this.props.searchTutor(name);
	}

	resetFilters(e: any) {
		e.preventDefault();
		//TODO reset HTML for elements
		this.props.resetFilters();
	}

	filterCourses(course: string) {
		this.props.filterTutorsByCourse(course);
	}

	filterRatings(rating: number) {
		this.props.filterTutorsByRating(rating);
	}

	isFiltering() {
		return (
			this.props.filterCourse !== "" ||
			this.props.filterRating !== 0 ||
			this.props.filterName !== ""
		);
	}

	render() {
		return (
			<>
				<NavBar
					searchable={true}
					handleSearch={this.handleSearch}
					sticky={true}
				/>
				<section id="section-tutors">
					<div className="wrapper">
						<div className="section-title">
							<img src={titleImg} alt="title icon" />{" "}
							<Title title={this.props.title.toUpperCase()} />
						</div>

						<div className="filters">
							<div className="filter">
								<p className="title">Courses</p>
								<FormDropdown
									title={"Courses"}
									options={this.props.courses}
									onChange={this.filterCourses}
									value={this.props.filterCourse}
									uppercase={true}
								/>
							</div>
							<div className="filter">
								<p className="title">Rating</p>
								<FormSlider
									min={0}
									max={10}
									step={1}
									onChange={this.filterRatings}
									value={this.props.filterRating}
								/>
							</div>
							<div className="filter" id="filter-submit">
								<FormButton
									title={"Reset Filters"}
									action={this.resetFilters}
								/>
							</div>
						</div>

						{this.isFiltering() ? (
							<TutorCardsFilterable
								tutors={this.props.tutors}
								filterCourse={this.props.filterCourse}
								filterRating={this.props.filterRating}
								filterName={this.props.filterName}
							/>
						) : (
							<TutorCards tutors={this.props.tutors} />
						)}

						<div className="review-website-button">
							<ReviewWebsiteButton />
						</div>

						{/* <AddTutorBox /> */}
					</div>
				</section>
			</>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		title: state.home.title,
		tutors: state.home.tutors,
		isLoading: state.home.isLoading,
		courses: state.home.courses,
		filterName: state.home.filterName,
		filterCourse: state.home.filterCourse,
		filterRating: state.home.filterRating
	};
};

const mapDispatchToProps = (dispatch: Function) => {
	return {
		getTutors: () => dispatch(getTutors()),
		getCourses: () => dispatch(getCourses()),
		resetFilters: () => dispatch(resetFilters()),
		filterTutorsByCourse: (course: string) =>
			dispatch(filterTutorsByCourse(course)),
		filterTutorsByRating: (rating: number) =>
			dispatch(filterTutorsByRating(rating)),
		searchTutor: (name: string) => dispatch(searchTutor(name))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tutors);
