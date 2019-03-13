import React, { Component } from "react";
import "./ManageTutors.css";

import NavBar from "../../Components/NavBar/NavBar";
import Title from "../../Components/Title/Title";

import LoadingSplash from "../../Components/LoadingSplash/LoadingSplash";
import SimpleTutorCard from "../../Components/SimpleTutorCard/SimpleTutorCard";

const _ = require('underscore');

class ManageTutors extends Component {

  state = {
    title: "Manage Tutors",
    tutors: [],
    isLoading: true
  };

  constructor(props) {
    super(props);

    this.fetchTutors = this.fetchTutors.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchTutors();
  }

  fetchTutors(e) {
    fetch('/api/v1/tutors')
      .then(response => response.json())
      .then(data => {
        this.setState({
          tutors: data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSearch(e) { }

  render() {

    if (this.state.isLoading) {
      return (
        <LoadingSplash />
      );
    }

    const tutors = this.state.tutors.map((tutor) =>
      <SimpleTutorCard tutor={tutor} editable={true} onUpdate={this.fetchTutors} />
    );

    return (
      <div className="section">
        <NavBar handleSearch={this.handleSearch} />
        <div className="section--wrapper">
          <Title title={this.state.title.toUpperCase()} />

          {
            tutors.map(function (object, i) {
              return (
                <div className={"manage-tutors-item"} key={i} onChange={this.fetchTutors}>
                  {object}
                </div>
              );
            }, this)
          }

        </div>
      </div>
    );
  }
}

export default ManageTutors;
