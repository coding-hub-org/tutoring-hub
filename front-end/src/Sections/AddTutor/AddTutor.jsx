import React, { Component } from "react";
import "./AddTutor.css";

// Import components
import NavBar from "../../Components/NavBar/NavBar";
import Title from "../../Components/Title/Title";
import AddTutorForm from "../../Components/AddTutorForm/AddTutorForm";

class AddTutor extends Component {

  state = {
    title: "Add Tutor"
  };

  componentDidMount() {
  }
  
  render() {
    return (
      <div className="section">
        <NavBar handleSearch={this.handleSearch} />
        <div className="section--wrapper">
          <Title title={this.state.title.toUpperCase()} />
          <AddTutorForm/>
        </div>
      </div>
    );
  }
}

export default AddTutor;
