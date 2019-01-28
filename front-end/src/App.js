import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// Import components
import Home from './Sections/Home/Home';
import Profile from './Sections/Profile/Profile';
import Review from './Sections/Review/Review';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Home}/>
          <Route exact path="/tutor/:id" component={Profile}/>
          <Route path="/tutor/:id/rate" component={Review}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
