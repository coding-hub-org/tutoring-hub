import React from 'react';
import './Tutors.css';
import TutorCard from '../TutorCard/TutorCard';

class Tutors extends React.Component{
    state = {
        tutors: [],
        isLoading: true
      };
    
    componentDidMount() {
        fetch('http://localhost:3001/')
        .then(response => response.json())
        .then(data => {
            this.setState({
                tutors: [...this.state.tutors, ...data],
                isLoading: false
            });
        }); 
    }
      
    render() {
        const {isLoading, tutors} = this.state;
        if (isLoading) {
            return(
                <h1>LOADING</h1>
            ) 
        }
        return(
            <div className={"tutors-component"}>
                <TutorCard tutors={tutors}/>
            </div>
        );
    }
}

export default Tutors;