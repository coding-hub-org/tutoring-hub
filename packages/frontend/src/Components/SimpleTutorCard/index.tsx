import React from "react";
import "./style.scss";

interface Props {
  editable?: boolean;
  tutor?: any;
  onUpdate?: any;
}

interface State {}

export default class SimpleTutorCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.removeTutor = this.removeTutor.bind(this);
  }

  removeTutor(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();

    fetch("/api/v1/cloudinary/delete/", {
      method: "DELETE"
    })
      .then(() => {
        console.log("Removed image with id " + this.props.tutor.imageID);
        fetch("/api/v1/tutors/remove/" + this.props.tutor._id, {
          method: "POST"
        }).then(() => {
          console.log("Removed tutor with id " + this.props.tutor._id);
          this.props.onUpdate();
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div className={"simple-tutor-card"}>
        <img src={this.props.tutor.imageUrl} alt="" />
        <div className={"simple-tutor-card-content"}>
          <div className="simple-tutor-card-title">
            {this.props.tutor.firstName + "  " + this.props.tutor.lastName}
          </div>
          {this.props.editable && (
            <div className="simple-tutor-card-controls">
              <ul>
                <li>
                  <span>
                    <a href="">Edit</a>
                  </span>
                </li>
                <li>
                  <span>
                    <a href="" onClick={this.removeTutor}>
                      Remove
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}
