import React from "react";
import "./Review.css";
import loadingIcon from "../../Assets/loading-icon.png";

import NavBar from "../../Components/NavBar/NavBar";
import Title from "../../Components/Title/Title";
import ScaleInput from "../../Components/ScaleInput/ScaleInput";
import YesNoInput from "../../Components/YesNoInput/YesNoInput";
import Subheading from "../../Components/Subheading/Subheading";
import CourseInput from "../../Components/CourseInput/CourseInput";
// import Course from '../../Components/Course/Course';

class Review extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			tutor: undefined,
			author: "Anonymous",

			course: undefined,
			content: undefined,
			methodology: undefined,
			organization: undefined,
			preparation: undefined,
			clarity: undefined,
			knowledge: undefined,

			bookAgain: undefined
		};

		this.onStatUpdate = this.onStatUpdate.bind(this);
		this.onBookAgainUpdate = this.onBookAgainUpdate.bind(this);
		this.onCourseTutoredUpdate = this.onCourseTutoredUpdate.bind(this);

		this.validateForm = this.validateForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);

		fetch(`/api/v1${window.location.pathname}`.replace("/rate", ""))
			.then(response => response.json())
			.then(data => {
				this.setState({
					tutor: data,
					loading: false
				});
			})
			.catch(error => {
				console.debug(error);
			});
	}

	validateForm(callback) {
		if (!this.state.course) {
			let msg = `The course tutored must be selected!`;
			callback(msg);
			return;
		}

		if (!this.state.methodology) {
			let msg = `A rating for methodology must be given!`;
			callback(msg);
			return;
		}
		if (!this.state.organization) {
			let msg = `A rating for organization must be given!`;
			callback(msg);
			return;
		}
		if (!this.state.preparation) {
			let msg = `A rating for preparation must be given!`;
			callback(msg);
			return;
		}
		if (!this.state.clarity) {
			let msg = `A rating for clarity must be given!`;
			callback(msg);
			return;
		}
		if (!this.state.knowledge) {
			let msg = `A rating for knowledge must be given!`;
			callback(msg);
			return;
		}

		if (this.state.bookAgain === undefined) {
			let msg = `A selection for booking again must be given!`;
			callback(msg);
			return;
		}

		callback();
	}

	handleSubmit = () => {
		let self = this;

		this.validateForm(function(err) {
			if (err) {
				alert(err);
				return;
			}

			const data = {
				author: self.state.author,
				course: self.state.course,
				content: self.state.content,
				bookAgain: self.state.ookAgain,
				statistics: {
					methodology: self.state.methodology,
					organization: self.state.organization,
					preparation: self.state.preparation,
					clarity: self.state.clarity,
					knowledge: self.state.knowledge
				}
			};

			let updatedTutor = self.state.tutor;
			updatedTutor.reviews.push(data);

			self.setState(
				{
					tutor: updatedTutor
				},
				function() {
					fetch(`/api/v1${window.location.pathname}`.replace("/rate", ""), {
						method: "PUT",
						body: JSON.stringify(self.state.tutor),
						headers: {
							"Content-Type": "application/json"
						}
					})
						.then(res => res.json())
						.then(response => {
							console.debug("Success");
							document.getElementById("navbar").scrollIntoView();
							window.location.href = "/";
						})
						.catch(error => console.error("Error:", error));
				}
			);
		});
	};

	onStatUpdate(elementName, value) {
		console.debug(`Updated ${elementName} to ${value}`);
		switch (elementName.toLowerCase()) {
			default:
				break;
			case "methodology":
				this.setState({
					methodology: value !== -1 ? Number(value) : undefined
				});
				break;
			case "organization":
				this.setState({
					organization: value !== -1 ? Number(value) : undefined
				});
				break;
			case "preparation":
				this.setState({
					preparation: value !== -1 ? Number(value) : undefined
				});
				break;
			case "clarity":
				this.setState({
					clarity: value !== -1 ? Number(value) : undefined
				});
				break;
			case "knowledge":
				this.setState({
					knowledge: value !== -1 ? Number(value) : undefined
				});
				break;
		}
		console.debug(`Updated stat: ${elementName} to ${value}`);
	}

	onBookAgainUpdate(elementName) {
		if (elementName) {
			const value = elementName.toLowerCase() === "yes" ? true : false;
			this.setState({
				bookAgain: value
			});
		} else {
			this.setState({
				bookAgain: undefined
			});
		}
		console.debug(`Book again is now: ${elementName}`);
	}

	onCourseTutoredUpdate(elementName) {
		if (elementName) {
			this.setState({
				course: elementName
			});
		} else {
			this.setState({
				course: undefined
			});
		}
		console.debug(`Course tutored is now: ${elementName}`);
	}

	handleComment = e => {
		this.setState({
			content: e.target.value
		});
	};

	handleChange = e => {
		const value = e.target.value === "yes" ? true : false;
		this.setState({
			bookAgain: value
		});
	};

	render() {
		if (this.state.loading) {
			return (
				<div className={"tutors-component--loading"}>
					<img src={loadingIcon} alt="" />
				</div>
			);
		}

		return (
			<div className={"review-section"}>
				<NavBar />

				{this.state.loading ? (
					<div className="review-section--wrapper">
						<div className="review-section--wrapper-load">
							<img
								className={"review-section--wrapper__loading"}
								src={loadingIcon}
								alt=""
							/>
						</div>
					</div>
				) : (
					<div className={"review-section--wrapper"}>
						<Title title={"Rate " + this.state.tutor.firstName} />

						<ScaleInput
							parameter={"methodology"}
							onChange={this.onStatUpdate}
							scaleMin={1}
							scaleMax={10}
						/>
						<ScaleInput
							parameter={"organization"}
							onChange={this.onStatUpdate}
							scaleMin={1}
							scaleMax={10}
						/>
						<ScaleInput
							parameter={"preparation"}
							onChange={this.onStatUpdate}
							scaleMin={1}
							scaleMax={10}
						/>
						<ScaleInput
							parameter={"clarity"}
							onChange={this.onStatUpdate}
							scaleMin={1}
							scaleMax={10}
						/>
						<ScaleInput
							parameter={"knowledge"}
							onChange={this.onStatUpdate}
							scaleMin={1}
							scaleMax={10}
						/>

						<Subheading title={"About your session"} />
						<div>
							<p>Would you book this tutor again? </p>
							<YesNoInput
								choices={["yes", "no"]}
								onChange={this.onBookAgainUpdate}
							/>
						</div>

						<Subheading title={"Class Tutored"} />
						<CourseInput
							choices={this.state.tutor.courses}
							onChange={this.onCourseTutoredUpdate}
						/>

						<Subheading title={"Comments"} />
						<textarea
							onChange={this.handleComment}
							placeholder={"How was your session? Help this tutor to improve "}
						/>

						<button onClick={this.handleSubmit}>SUBMIT REVIEW</button>
					</div>
				)}
			</div>
		);
	}
}

export default Review;
