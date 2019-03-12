import React, { Component } from "react";
import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Sections/Home/Home";
import Profile from "./Sections/Profile/Profile";
import Review from "./Sections/Review/Review";
import AddTutor from "./Sections/AddTutor/AddTutor";
import ManageTutors from "./Sections/ManageTutors/ManageTutors";

import Footer from "./Components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Switch>
            <Route exact path="/tutors" component={Home} />
            <Route path="/tutors/manage" component={ManageTutors} />
            <Route path="/tutors/add" component={AddTutor} />
            <Route exact path="/tutors/:id" component={Profile} />
            <Route exact path="/tutors/:id/rate" component={Review} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
