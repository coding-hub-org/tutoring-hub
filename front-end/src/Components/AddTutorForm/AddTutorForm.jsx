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
            newTutor: {
                firstName: '',
                lastName: '',
                major: '',
                tutorSince: '',
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
        let tutorData = this.state.newTutor;

        fetch('http://localhost:3001/addtutor', {
            method: "POST",
            body: JSON.stringify(tutorData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            response.json().then(data => {
                console.log("Successful " + data);
            });
        })

        // alert("Submitted!");
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState(() => {
            return {
                newTutor: {
                    firstName: '',
                    lastName: '',
                    major: '',
                    tutorSince: '',
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
        console.log("Course change");
    }

    render() {
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
                            name="tutorSince"
                        />
                        <FormDate
                            id={"tutorSince"}
                            name={"tutorSince"}
                            value={this.state.newTutor.tutorSince}
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

export default AddTutorForm;