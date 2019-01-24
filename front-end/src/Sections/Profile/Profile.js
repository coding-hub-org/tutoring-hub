import React, { Component } from 'react';
import './Profile.css';

// Import components
import NavBar from '../../Components/NavBar/NavBar';
import Title from '../../Components/Title/Title';
import Stats from '../../Components/Stats/Stats';

class Profile extends Component {
  render() {
    const {path} = this.props;
    console.log(path);
    return (
        <div className="profile-section">
            <NavBar/>  
            <div className="profile-section--wrapper">
                <Title title = {'Gaurav Jayasawal'}/>
                <Stats/>
                <p>{window.location.pathname}</p>
            </div>
        </div>
    );
  }
}

export default Profile;
