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
                firstName: '',
                lastName: '',
                major: '',
                since: '',
                courses: []
            }
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);

        this.handleInput = this.handleInput.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleCoursesChange = this.handleCoursesChange.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        if (this.state.newTutor.firstName === '') {
            alert('You must enter a valid first name');
            return;
        }

        if (this.state.newTutor.lastName === '') {
            alert('You must enter a valid last name');
            return;
        }

        if (this.state.newTutor.major === '') {
            alert('You must enter a valid major');
            return;
        }

        if (this.state.newTutor.since === '') {
            alert('You must enter a valid date');
            return;
        }

        if (this.state.newTutor.courses.length === 0) {
            alert('You must enter courses');
            return;
        }

        let tutorData = this.state.newTutor;
        let jsonData = JSON.stringify(tutorData);
        fetch('/api/v1/tutors/create', {
            method: "POST",
            body: jsonData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(() => {
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
                    firstName: '',
                    lastName: '',
                    major: '',
                    since: '',
                    courses: []
                }
            }
        });
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