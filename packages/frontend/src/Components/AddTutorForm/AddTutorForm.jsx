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

    handleFormSubmit(event) {
        event.preventDefault();

        let tutorData = this.state.newTutor;

        // create the tutor
        fetch('/api/v1/tutors/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tutorData)
        })
            .then(response => response.json())
            .then(createdTutor => {
                var tutorID = createdTutor._id;

                // upload the image
                var form = new FormData();
                form.append("image", this.state.image);
                fetch("/api/v1/cloudinary/upload", {
                    method: "POST",
                    body: form
                })
                    .then(response => response.json())
                    .then(createdImage => {

                        // update the tutor to have the image
                        tutorData.imageUrl = createdImage.url;
                        tutorData.imageID = createdImage.public_id;
                        fetch('/api/v1/tutors/' + tutorID, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(tutorData)
                        })
                            .then(response => response.json())
                            .then(() => {
                                this.setState(() => {
                                    return {
                                        submitted: true
                                    }
                                });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
    }

    handleClearForm(event) {
        event.preventDefault();
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

    handleImageSelect(image) {
        this.setState({
            image: image
        });
    }

    handleInput(event) {
        let value = event.target.value;
        let name = event.target.name;
        this.setState(prevState => {
            return {
                newTutor: {
                    ...prevState.newTutor, [name]: value
                }
            }
        });
    }

    handleDate(event) {
        let value = event.target.value;
        let name = event.target.name;
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
                <form className={"add-tutor-form"} method="post" encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
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