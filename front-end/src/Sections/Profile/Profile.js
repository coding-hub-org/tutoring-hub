import React, { Component } from 'react';
import './Profile.css';
import loadingIcon from '../../Assets/loading-icon.png';
import testImage from '../../Assets/gaurav-img-test.png';

// Import components
import NavBar from '../../Components/NavBar/NavBar';
import Title from '../../Components/Title/Title';
import Stats from '../../Components/Stats/Stats';
import Course from '../../Components/Course/Course';
import RatingCard from '../../Components/RatingCard/RatingCard';
import Subheading from '../../Components/Subheading/Subheading';

class Profile extends Component {
    state = {
        name: "",
        courses: [],
        isLoading: true
    }

    componentDidMount() {
        fetch(`http://localhost:3001${window.location.pathname}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                name: `${data.firstName} ${data.lastName}`,
                courses: [...this.state.courses, ...data.courses],
                isLoading: false
            });
        })
        .catch((error) => {
            console.log(error);
        }); 
    }

    render() {
        return (
            <div className="profile-section">
                <NavBar/>  
                {
                    this.state.isLoading ?
                    <div className="profile-section--wrapper">
                        <img className={"profile-section--wrapper__loading"} src={loadingIcon} alt=""/>
                    </div>  :
                    <div className="profile-section--wrapper">
                        <Title title = {this.state.name}/>
                        <div className="profile-section--wrapper__upper">
                            <div className={"profile-section--wrapper__upper--left"}>
                            </div>
                            <div className={"profile-section--wrapper__upper--center"}>
                                <Subheading title={"Overview:"}/>
                                <p><span>MAJOR: </span>Computer Science</p>
                                <p><span>TUTOR SINCE: </span>Computer Science</p>
                                <p><span>REVIEWS: </span>Computer Science</p>
                                <p><span>WOULD BOOK AGAIN? : </span>Computer Science</p>
                                <Subheading title={"Courses:"}/>
                                <Course courses={this.state.courses}/>
                            </div>
                            <div className={"profile-section--wrapper__upper--right"}>
                                <RatingCard/>
                            </div>
                        </div>
                        <Subheading title={'Stats:'}/>
                        <Stats/>
                        <div className={'profile-section--wrapper__reviews'}>
                            <Subheading title={'Reviews:'}/>
                            <a href="#">REVIEW {this.state.name.toUpperCase()}</a>
                        </div>
                        
                    </div>
                }                
            </div>
        );
    }
}

export default Profile;
