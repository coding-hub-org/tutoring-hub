import React from "react";
import "./style.scss";
import loadingIcon from "../../Assets/loading-icon.png";

import NavBar from "../../Components/NavBar";
import Title from "../../Components/Title";
import ScaleInput from "../../Components/ScaleInput";
import YesNoInput from "../../Components/YesNoInput";
import Subheading from "../../Components/Subheading";
import CourseInput from "../../Components/CourseInput";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { response } from "express";

interface ReviewProps extends RouteComponentProps<{ id: string }> {
	isLoading: boolean;
	tutor: any;
}

interface ReviewState {
	author?: string;
	course?: string;
	content?: number;
	methodology?: number;
	organization?: number;
	preparation?: number;
	clarity?: number;
	knowledge?: number;
	bookAgain?: boolean;
	comment?: string;
}

class Review extends React.Component<ReviewProps, ReviewState> {
	constructor(props: ReviewProps) {
		super(props);

		this.state = {
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
		this.submitReview = this.submitReview.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	validateForm(callback: any) {
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

	async submitReview(updatedTutor: any) {
		const response = await fetch(
			`/api/v1/tutors/${this.props.match.params.id}`,
			{
				method: "PUT",
				body: JSON.stringify(updatedTutor),
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		let data = await response.json();
		return data;
	}

	handleSubmit = () => {
		let self = this;

		this.validateForm(function(err: Error) {
			if (err) {
				alert(err);
				return;
			}

			const newReview = {
				author: self.state.author,
				course: self.state.course,
				content: self.state.content,
				bookAgain: self.state.bookAgain,
				statistics: {
					methodology: self.state.methodology,
					organization: self.state.organization,
					preparation: self.state.preparation,
					clarity: self.state.clarity,
					knowledge: self.state.knowledge
				}
			};

			let reviewsArr = [...self.props.tutor.reviews, newReview];
			let updatedTutor = { ...self.props.tutor, reviews: reviewsArr };

			self
				.submitReview(updatedTutor)
				.then(() => {
					console.debug("Success");
					window.location.assign(`/tutors/${self.props.match.params.id}`);
				})
				.catch(error => console.error("Error:", error));
		});
	};

	onStatUpdate(elementName: string, value: number) {
		console.debug(`Updated ${elementName} to ${value}`);
		switch (elementName.toLowerCase()) {
			default:
				break;
			case "methodology":
				this.setState({
					methodology: value !== -1 ? value : undefined
				});
				break;
			case "organization":
				this.setState({
					organization: value !== -1 ? value : undefined
				});
				break;
			case "preparation":
				this.setState({
					preparation: value !== -1 ? value : undefined
				});
				break;
			case "clarity":
				this.setState({
					clarity: value !== -1 ? value : undefined
				});
				break;
			case "knowledge":
				this.setState({
					knowledge: value !== -1 ? value : undefined
				});
				break;
		}
		console.debug(`Updated stat: ${elementName} to ${value}`);
	}

	onBookAgainUpdate(elementName: string) {
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

	onCourseTutoredUpdate(elementName: string) {
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

	handleComments = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		this.setState({
			comment: event.currentTarget.value
		});
	};

	render() {
		return this.props.isLoading ? (
			<div className={"tutors-component--loading"}>
				<img src={loadingIcon} alt="" />
			</div>
		) : (
			<div className={"review-section"}>
				<NavBar />
				<div className={"review-section--wrapper"}>
					<Title title={"Rate " + this.props.tutor.firstName} />

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
						choices={this.props.tutor.courses}
						onChange={this.onCourseTutoredUpdate}
					/>

					<Subheading title={"Comments"} />
					<textarea
						onChange={this.handleComments}
						placeholder={"How was your session? Help this tutor to improve "}
					/>

					<button onClick={this.handleSubmit}>SUBMIT REVIEW</button>
				</div>
				)}
			</div>
		);
	}
}

const matStateToProps = (state: any, props: any) => {
	let tutorId = props.match.params.id;
	return {
		isLoading: state.home.isLoading,
		tutor: state.home.tutors.find((t: { _id: any }) => t._id === tutorId)
	};
};

export default connect(matStateToProps)(Review);
