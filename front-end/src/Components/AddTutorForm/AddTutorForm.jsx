import React from 'react';
import './AddTutorForm.css';

import ImageUpload from '../ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import FormDate from '../FormDate/FormDate';
import FormLabel from '../FormLabel/FormLabel';
import FormButton from '../FormButton/FormButton';
import FormList from '../FormList/FormList';

// https://www.codementor.io/blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y
class AddTutorForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            newTutor: {
                image: '',
                firstName: '',
                lastName: '',
                major: '',
                since: '',
                courses: []
            }
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);

        this.handleImageSelect = this.handleImageSelect.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleCoursesChange = this.handleCoursesChange.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        if (this.state.newTutor.courses.length === 0) {
            alert('You must enter courses');
            return;
        }

        let tutorData = this.state.newTutor;
        fetch('/api/v1/tutors/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tutorData)
        }).then(() => {
            //TODO implement image upload
            // fetch('/api/v1/tutors/create', {
            //     method: "POST",
            //     body: this.state.image
            // }).then((res) => {
            //     console.log(res.json());
            // });
            this.setState(() => {
                return {
                    submitted: true
                }
            });
        });
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState(() => {
            return {
                newTutor: {
                    image: '',
                    firstName: '',
                    lastName: '',
                    major: '',
                    since: '',
                    courses: []
                }
            }
        });
    }

    handleImageSelect(url) {
        this.setState({
            image: url
        })
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => {
            return {
                newTutor: {
                    ...prevState.newTutor, [name]: value
                }
            }
        });
    }

    handleDate(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState => {
            return {
                newTutor: {
                    ...prevState.newTutor, [name]: value
                }
            }
        });
    }

    handleCoursesChange(items) {
        this.setState(prevState => {
            return {
                newTutor: {
                    ...prevState.newTutor, courses: items
                }
            }
        });
    }

    render() {
        if (this.state.submitted) {
            return (
                <div>
                    <p>Added new tutor to the database</p>
                </div>
            )
        } else {
            return (
                <form id={"form"} onSubmit={this.handleFormSubmit} className={"add-tutor-form"} >
                    <div className="form-row">
                        <FormLabel
                            labelText={"Profile Picture"}
                            name="profilePicture"
                        />
                        <ImageUpload
                            id="profilePicture"
                            name="profilePicture"
                            onChange={this.handleImageSelect}
                        />
                    </div>
                    <div className="form-row">
                        <span className="form-field">
                            <FormLabel
                                labelText={"First Name"}
                                name="firstName"
                            />
                            <FormInput
                                id={"firstName"}
                                name={"firstName"}
                                type={"text"}
                                value={this.state.newTutor.firstName}
                                placeholder={'Jane'}
                                handleChange={this.handleInput}
                                required={true}
                            />
                        </span>
                    </div>
                    <div className="form-row">
                        <span className="form-field">
                            <FormLabel
                                labelText={"Last Name"}
                                name="lastName"
                            />
                            <FormInput
                                id={"lastName"}
                                name={"lastName"}
                                type={"text"}
                                value={this.state.newTutor.lastName}
                                placeholder={'Doe'}
                                handleChange={this.handleInput}
                                required={true}
                            />
                        </span>
                    </div>
                    <div className="form-row">
                        <span className="form-field">
                            <FormLabel
                                labelText={"Major"}
                                name="major"
                            />
                            <FormInput
                                id={"major"}
                                name={"major"}
                                type={"text"}
                                value={this.state.newTutor.major}
                                placeholder={'Computer Science'}
                                handleChange={this.handleInput}
                                required={true}
                            />
                        </span>
                    </div>
                    <div className="form-row">
                        <span className="form-field">
                            <FormLabel
                                labelText={"Tutor Since"}
                                name="since"
                            />
                            <FormDate
                                id={"since"}
                                name={"since"}
                                value={this.state.newTutor.since}
                                handleChange={this.handleDate}
                                required={true}
                            />
                        </span>
                    </div>
                    <div className="form-row">
                        <span className="form-field">
                            <FormLabel
                                labelText={"Courses"}
                                name="courses"
                            />
                            <FormList
                                id={"courses"}
                                name={"courses"}
                                type={"text"}
                                placeholder={'CSC221'}
                                value={this.state.newTutor.courses}
                                handleChange={this.handleCoursesChange}
                            />
                        </span>
                    </div>
                    <FormButton
                        title={"Submit"}
                    />
                </form>
            )
        }
    }
}

export default AddTutorForm;