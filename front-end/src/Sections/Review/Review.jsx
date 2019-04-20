import React from "react";
import "./Review.css";
import loadingIcon from "../../Assets/loading-icon.png";

import NavBar from "../../Components/NavBar/NavBar";
import Title from "../../Components/Title/Title";
import QuestionTile from "../../Components/QuestionTile/QuestionTile";
import Subheading from "../../Components/Subheading/Subheading";
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
			knowlege: undefined,
			bookAgain: undefined
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);

		fetch(`/api/v1${window.location.pathname}`.replace("/rate", ""))
			.then(response => response.json())
			.then(data => {
				this.setState({
					tutor: data,
					loading: false,
				});
			})
			.catch(error => {
				console.log(error);
			});
	}


	handleClick = () => {
		const {
			author,
			course,
			content,
			methodology,
			organization,
			preparation,
			clarity,
			knowlege,
			bookAgain
        } = this.state;
        
		if (
			author &&
			course &&
			content &&
			methodology &&
			organization &&
			preparation &&
			clarity &&
			knowlege &&
			bookAgain !== undefined
		) {
			// const url = this.props.match.url;
			const data = {
				author: author,
				course: course,
				content: content,
				bookAgain: bookAgain,
				statistics: {
					methodology: methodology,
					organization: organization,
					preparation: preparation,
					clarity: clarity,
					knowlege: knowlege
				}
			};

			let updatedTutor = this.state.tutor;
			updatedTutor.reviews.push(data);

			this.setState({
				tutor: updatedTutor
			}, function () {
				fetch(`/api/v1${window.location.pathname}`.replace("/rate", ""), {
					method: "PUT",
					body: JSON.stringify(this.state.tutor),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(response => {
						console.log("Success");
						document.getElementById("navbar").scrollIntoView();
						window.location.href = "/";
					})
					.catch(error => console.error("Error:", error));
			});
		} else {
			console.log("ERROR", this.state);
		}
	};

	updateStats = score => {
		const cathegory = score.target.name;
		switch (cathegory) {
			case "methodology":
				this.setState({
					methodology: Number(score.target.value)
				});
				break;
			case "organization":
				this.setState({
					organization: Number(score.target.value)
				});
				break;
			case "preparation":
				this.setState({
					preparation: Number(score.target.value)
				});
				break;
			case "clarity":
				this.setState({
					clarity: Number(score.target.value)
				});
				break;
			default:
				this.setState({
					knowlege: score.target.value
				});
				break;
		}
	};

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
    
    handleChangeCourse = (e) => {
        const value = e.target.value;
        this.setState({
            course: value
        })
    }

	render() {
        if (this.state.loading){
            return (
                <div className={"tutors-component--loading"}>
                    <img src={loadingIcon} alt="" />
                </div>
            )
        }
        
        const courses_list = this.state.tutor.courses.map((course) => 
            <div className="review-section--tutored-class">
                <input
                    type="radio"
                    className={"option-input radio"}
                    value={course}
                    name={"tutored-course"}
				/>

				<label>{course}</label>
            </div>
        )

		return (
			<div className={"review-section"}>
				<NavBar />

				{this.state.loading ?
					<div className="review-section--wrapper">
						<div className="review-section--wrapper-load">
							<img
								className={"review-section--wrapper__loading"}
								src={loadingIcon}
								alt=""
							/>
						</div>
					</div>
					:
					<div className={"review-section--wrapper"}>
						<Title title={"Rate " + this.state.tutor.firstName} />

						<QuestionTile
							parameter={"methodology"}
							updateStats={this.updateStats}
						/>
						<QuestionTile
							parameter={"organization"}
							updateStats={this.updateStats}
						/>
						<QuestionTile
							parameter={"preparation"}
							updateStats={this.updateStats}
						/>
						<QuestionTile parameter={"clarity"} updateStats={this.updateStats} />
						<QuestionTile parameter={"knowlege"} updateStats={this.updateStats} />

						<Subheading title={"About your session"} />
						<div>
							<p>Would you book this tutor again? </p>
							<div onChange={this.handleChange} className={"review-section--bookagain"}>
								<input
									type="radio"
									className={"option-input radio"}
									value="yes"
									name={"book-again"}
								/>
								<label>YES</label>
								<input
									type="radio"
									className={"option-input radio"}
									value="no"
									name={"book-again"}
								/>
								<label>NO</label>
							</div>
						</div>
						<p>Class tutored </p>
                        <div onChange={this.handleChangeCourse} className={"review-section--tutored-classes"}>
                            {courses_list}
                        </div>
						<Subheading title={"Comments"} />
						<textarea
							onChange={this.handleComment}
							placeholder={"How was your session? Help this tutor to improve "}
						/>
						<button onClick={this.handleClick}>SUBMIT REVIEW</button>
					</div>
				}
			</div>
		);
	}
}

export default Review;
