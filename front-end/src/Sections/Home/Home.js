import React, { Component } from "react";
import "./Home.css";

// Import components
import NavBar from "../../Components/NavBar/NavBar";
import Title from "../../Components/Title/Title";
import Tutors from "../../Components/Tutors/Tutors";
import loadingIcon from '../../Assets/loading-icon.png';

class Home extends Component {

  state = {
    tutors: [],
    isLoading: true,
    searchField: ""
  };

  componentDidMount() {
      fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(data => {
          this.setState({
              tutors: [...this.state.tutors, ...data],
              isLoading: false
          });
      })
      .catch((error) => {
          console.log(error);
      }); 
  }

  handleSearch = (event) => {
    this.setState({
      searchField: event.target.value
    })
  }

  render() {
    if (this.state.isLoading) {
        return(
          <div className={"tutors-component--loading"}>
              <img src={loadingIcon} alt=""/>
          </div>
            
        ) 
    }
    const filterTutors = this.state.tutors.filter(tutor => {
      return (tutor.firstName + " " + tutor.lastName).toLowerCase().includes(this.state.searchField.toLowerCase());
    });
    return (
      <div className="home-section">
        <NavBar handleSearch={this.handleSearch} />
        <div className="home-section--wrapper">
          <Title title={"ALL TUTORS"} />
          {
            (filterTutors.length === 0) ? <p>NOT FOUND</p>:
            <Tutors tutors = {filterTutors} />
          }
        </div>
      </div>
    );
  }
}

export default Home;
