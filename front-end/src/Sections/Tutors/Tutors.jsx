import React, { Component } from "react";
import "./Tutors.css";

// Import components
import NavBar from "../../Components/NavBar/NavBar";
import Title from "../../Components/Title/Title";
import TutorCards from "../../Components/TutorCards/TutorCards";
import TutorCardsFilterable from "../../Components/TutorCardsFilterable/TutorCardsFilterable";
import FormDropdown from "../../Components/FormDropdown/FormDropdown";
import FormSlider from "../../Components/FormSlider/FormSlider";
import FormButton from "../../Components/FormButton/FormButton";
import AddTutorBox from "../../Components/AddTutorBox/AddTutorBox";

const _ = require("underscore");

class Tutors extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "All Tutors",
			isLoading: true,
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
		this.fetchTutors();
		this.fetchCourses();
	}

	fetchTutors() {
		fetch("/api/v1/tutors")
			.then(response => response.json())
			.then(data => {
				this.setState({
					tutors: _.sortBy(data, "lastName"),
					isLoading: false
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	fetchCourses() {
		fetch("/api/v1/courses")
			.then(response => response.json())
			.then(data => {
				this.setState({
					courses: _.sortBy(data, function(course) {
						return course;
					})
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	handleSearch(e) {
		var value = e.target.value;
		this.setState({
			filterName: value
		});
	}

	resetFilters(e) {
		e.preventDefault();
		//TODO reset HTML for elements
		this.setState({
			filterName: "",
			filterCourse: "",
			filterRating: 0
		});
	}

	filterCourses(course) {
		this.setState({
			filterCourse: course === "" ? "" : course
		});
	}

	filterRatings(rating) {
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
		return (
			<div className="section">
				<NavBar searchable={true} handleSearch={this.handleSearch} />
				<div className="section--wrapper">
					<Title title={this.state.title.toUpperCase()} />

					<div className="Filters">
						<div>
							<span>Filters</span>
							<FormDropdown
								title={"Courses"}
								options={this.state.courses}
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
								value={this.state.filterRating}
							/>
						</div>
						<div>
							<FormButton title={"Reset Filters"} action={this.resetFilters} />
						</div>
					</div>

					{this.isFiltering() ? (
						<TutorCardsFilterable
							tutors={this.state.tutors}
							filterCourse={this.state.filterCourse}
							filterRating={this.state.filterRating}
							filterName={this.state.filterName}
						/>
					) : (
						<TutorCards tutors={this.state.tutors} />
					)}

					{/* <AddTutorBox /> */}
				</div>
			</div>
		);
	}
}

export default Tutors;
