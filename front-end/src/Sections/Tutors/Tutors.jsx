import React, { Component } from "react";
import "./Tutors.css";

// Import components
import NavBar from "../../Components/NavBar/NavBar";
import Title from "../../Components/Title/Title";
import TutorCards from "../../Components/TutorCards/TutorCards";

const _ = require('underscore');

class Tutors extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Tutors",
            tutors: [],
            isLoading: true
        }
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

    render() {
        return (
            <div className="section">
                <NavBar handleSearch={this.handleSearch} />
                <div className="section--wrapper">
                    <Title title={this.state.title.toUpperCase()} />
                    <TutorCards tutors={this.state.tutors} />
                </div>
            </div>
        );
    }
}

export default Tutors;
