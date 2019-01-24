import React from 'react';
import './Tutors.css';
import TutorCard from '../TutorCard/TutorCard';
import loadingIcon from '../../Assets/loading-icon.png';

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
        })
        .catch((error) => {
            console.log(error);
        }); 
    }
      
    render() {
        const {isLoading, tutors} = this.state;
        if (isLoading) {
            return(
                <div className={"tutors-component--loading"}>
                    <img src={loadingIcon} alt=""/>
                </div>
                
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