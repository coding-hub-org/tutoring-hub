import React, { FormEvent, ChangeEvent } from "react";
import "./style.scss";

import ImageUpload from "../ImageUpload";
import FormInput from "../FormInput";
import FormDate from "../FormDate";
import FormLabel from "../FormLabel";
import FormButton from "../FormButton";
import FormList from "../FormList";

interface Props {}

interface State {
  submitted: boolean;
  newTutor?: {
    firstName?: string;
    lastName?: string;
    major?: string;
    since?: string;
    courses?: string[];
    imageURL?: string;
    imageID?: string;

    imageToUpload?: string;
  };
}

// https://www.codementor.io/blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y
export default class AddTutorForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      submitted: false,
      newTutor: {
        firstName: "",
        lastName: "",
        major: "",
        since: "",
        courses: [],
        imageURL: "",
        imageID: ""
      }
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleCoursesChange = this.handleCoursesChange.bind(this);
  }

  async handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (this.state.newTutor === undefined) {
      console.error("Created tutor is undefined!");
      return;
    }

    // create the tutor
    let createdTutor: any = (await fetch("/api/v1/tutors/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.newTutor)
    })).json();

    const tutorID = createdTutor._id;

    // if no image to upload
    if (this.state.newTutor.imageToUpload === undefined) {
      return;
    }

    // upload the image
    var form = new FormData();
    form.append("image", this.state.newTutor.imageToUpload);
    const createdImage: any = (await fetch("/api/v1/cloudinary/upload", {
      method: "POST",
      body: form
    })).json();
    // update the tutor to have the image
    this.state.newTutor.imageURL = createdImage.url;
    this.state.newTutor.imageID = createdImage.public_id;

    // put tutor into database
    await fetch("/api/v1/tutors/" + tutorID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.newTutor)
    });

    this.setState({
      submitted: true,
      newTutor: undefined
    });
  }

  handleImageSelect(image: any) {
    this.setState(prevState => ({
      newTutor: {
        ...prevState.newTutor,
        imageToUpload: image
      }
    }));
  }

  handleInput(event: ChangeEvent) {
    let value = event.target.nodeValue;
    let name = event.target.nodeName;
    this.setState(prevState => {
      return {
        newTutor: {
          ...prevState.newTutor,
          [name]: value
        }
      };
    });
  }

  handleDate(event: ChangeEvent) {
    let value = event.target.nodeValue;
    let name = event.target.nodeName;
    this.setState(prevState => {
      return {
        newTutor: {
          ...prevState.newTutor,
          [name]: value
        }
      };
    });
  }

  handleCoursesChange(items: string[]) {
    this.setState(prevState => {
      return {
        newTutor: {
          ...prevState.newTutor,
          courses: items
        }
      };
    });
  }

  render() {
    if (this.state.submitted) {
      return (
        <div>
          <p>Added new tutor to the database</p>
        </div>
      );
    } else {
      return (
        <form
          className={"add-tutor-form"}
          method="post"
          encType="multipart/form-data"
          onSubmit={this.handleFormSubmit}
        >
          <div className="form-row">
            <FormLabel labelText={"Profile Picture"} name="profilePicture" />
            <ImageUpload
              id="profilePicture"
              name="profilePicture"
              onChange={this.handleImageSelect}
            />
          </div>
          <div className="form-row">
            <span className="form-field">
              <FormLabel labelText={"First Name"} name="firstName" />
              <FormInput
                id={"firstName"}
                name={"firstName"}
                type={"text"}
                value={
                  this.state.newTutor !== undefined
                    ? this.state.newTutor.firstName
                    : ""
                }
                placeholder={"Jane"}
                handleChange={this.handleInput}
                required={true}
              />
            </span>
          </div>
          <div className="form-row">
            <span className="form-field">
              <FormLabel labelText={"Last Name"} name="lastName" />
              <FormInput
                id={"lastName"}
                name={"lastName"}
                type={"text"}
                value={
                  this.state.newTutor !== undefined
                    ? this.state.newTutor.lastName
                    : ""
                }
                placeholder={"Doe"}
                handleChange={this.handleInput}
                required={true}
              />
            </span>
          </div>
          <div className="form-row">
            <span className="form-field">
              <FormLabel labelText={"Major"} name="major" />
              <FormInput
                id={"major"}
                name={"major"}
                type={"text"}
                value={
                  this.state.newTutor !== undefined
                    ? this.state.newTutor.major
                    : ""
                }
                placeholder={"Computer Science"}
                handleChange={this.handleInput}
                required={true}
              />
            </span>
          </div>
          <div className="form-row">
            <span className="form-field">
              <FormLabel labelText={"Tutor Since"} name="since" />
              <FormDate
                id={"since"}
                name={"since"}
                value={
                  this.state.newTutor !== undefined
                    ? this.state.newTutor.since
                    : ""
                }
                handleChange={this.handleDate}
                required={true}
              />
            </span>
          </div>
          <div className="form-row">
            <span className="form-field">
              <FormLabel labelText={"Courses"} name="courses" />
              <FormList
                id={"courses"}
                name={"courses"}
                type={"text"}
                placeholder={"CSC221"}
                value={
                  this.state.newTutor !== undefined
                    ? this.state.newTutor.courses
                    : []
                }
                handleChange={this.handleCoursesChange}
              />
            </span>
          </div>
          <FormButton title={"Submit"} action={this.handleFormSubmit} />
        </form>
      );
    }
  }
}
