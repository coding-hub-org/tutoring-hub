import React, { Component } from "react";
import "./style.scss";

import NavBar from "../../Components/NavBar";
import Title from "../../Components/Title";
import AddTutorForm from "../../Components/AddTutorForm";

export default class AddTutor extends Component {

  state = {
    title: "Add Tutor"
  };

  componentDidMount() {
  }

  handleSearch() { }

  render() {
    return (
      <div className="section">
        <NavBar handleSearch={this.handleSearch} />
        <div className="section--wrapper">
          <Title title={this.state.title.toUpperCase()} />
          <AddTutorForm />
        </div>
      </div>
    );
  }
}
