import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// Import components
import Home from './Sections/Home/Home';
import Profile from './Sections/Profile/Profile';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Home}/>
          <Route path="/tutor/:id" component={Profile}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
