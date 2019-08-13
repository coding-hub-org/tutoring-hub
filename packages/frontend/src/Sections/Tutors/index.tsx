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
import { getTutors, getCourses, resetFilters } from "../../actions/homeActions";

import _ from "underscore";

interface Props {
	courses: string[];
	getCourses: Function;
	getTutors: Function;
	resetFilters: Function;
	isLoading: boolean;
	title: string;
	tutors: any[];
}

interface State {
	tutors: any[];
	courses: string[];
	filterName: string;
	filterCourse: string;
	filterRating: number;
}

class Tutors extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			tutors: [],
			courses: [],
			filterName: "",
			filterCourse: "",
			filterRating: 0
		};

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
		let value = e.currentTarget.value;
		this.setState({
			filterName: value
		});
	}

	resetFilters(e: any) {
		e.preventDefault();
		//TODO reset HTML for elements
		this.props.resetFilters();
	}

	filterCourses(course: string) {
		this.setState({
			filterCourse: course === "" ? "" : course
		});
	}

	filterRatings(rating: number) {
		if (rating <= 0) {
			this.setState({
				filterRating: 0
			});
		} else {
			this.setState({
				filterRating: rating
			});
		}
	}

	isFiltering() {
		return (
			this.state.filterCourse !== "" ||
			this.state.filterRating !== 0 ||
			this.state.filterName !== ""
		);
	}

	render() {
		console.log("PROPS", this.props);
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
									value={this.state.filterCourse}
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
									value={this.state.filterRating}
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
								filterCourse={this.state.filterCourse}
								filterRating={this.state.filterRating}
								filterName={this.state.filterName}
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
		courses: state.home.courses
	};
};

const mapDispatchToProps = (dispath: Function) => {
	return {
		getTutors: () => dispath(getTutors()),
		getCourses: () => dispath(getCourses()),
		resetFilters: () => dispath(resetFilters())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tutors);
