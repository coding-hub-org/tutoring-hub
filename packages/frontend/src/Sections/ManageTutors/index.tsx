import React, { Component } from "react";
import "./style.scss";

import NavBar from "../../Components/NavBar";
import Title from "../../Components/Title";

import LoadingSplash from "../../Components/LoadingSplash";
import SimpleTutorCard from "../../Components/SimpleTutorCard";

import _ from 'underscore';


interface Props {

}

interface State {

}

export default class ManageTutors extends Component<Props, State> {

  state = {
    title: "Manage Tutors",
    tutors: [],
    isLoading: true
  };

  constructor(props: Props) {
    super(props);

    this.fetchTutors = this.fetchTutors.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchTutors();
  }

  fetchTutors() {
    fetch('/api/v1/tutors')
      .then(response => response.json())
      .then(data => {
        this.setState({
          tutors: _.sortBy(data, 'lastName'),
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSearch() { }

  render() {

    let self = this;

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
                <div className={"manage-tutors-item"} key={i} onChange={self.fetchTutors}>
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