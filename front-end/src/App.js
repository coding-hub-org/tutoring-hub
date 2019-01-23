import React, { Component } from 'react';
import './App.css';

// Import components
import NavBar from './Components/NavBar/NavBar';
import Title from './Components/Title/Title';
import TutorCard from './Components/TutorCard/TutorCard';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>  
        <div className="App-wrapper">
          <Title title = {'ALL TUTORS'}/>
          <TutorCard tutor={'Gaurav Jayasawal'}/>
          <TutorCard tutor={'Gonzalo Reyes'}/>
        </div>
      </div>
    );
  }
}

export default App;
