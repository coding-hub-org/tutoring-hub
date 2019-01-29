import React, { Component } from "react";
import "./Home.css";

// Import components
import NavBar from "../../Components/NavBar/NavBar";
import Title from "../../Components/Title/Title";
import Tutors from "../../Components/Tutors/Tutors";
import Footer from "../../Components/Footer/Footer";

class Home extends Component {
  render() {
    return (
      <div className="home-section">
        <NavBar />
        <div className="home-section--wrapper">
          <Title title={"ALL TUTORS"} />
          <Tutors />
        </div>
      </div>
    );
  }
}

export default Home;
