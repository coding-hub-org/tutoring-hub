import React, { Component } from "react";
import "./App.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Profile from "./Sections/Profile";
import Review from "./Sections/Review";
import Tutors from "./Sections/Tutors";
// import AddTutor from "./Sections/AddTutor";
// import ManageTutors from "./Sections/ManageTutors/ManageTutors";

import Footer from "./Components/Footer";
import BackToTopButton from "./Components/BackToTopButton";
import { connect } from "react-redux";
import { getTutors, getCourses } from "./actions/homeActions";
interface AppProps {
  getTutors: Function;
  getCourses: Function;
}

class App extends Component<AppProps> {
  componentDidMount() {
    this.props.getTutors();
    this.props.getCourses();
  }

  render() {
    console.log("PROPS", this.props);
    return (
      <BrowserRouter>
        <div className="App">
          <BackToTopButton minScrollAmt={25} />
          <Switch>
            <Route exact path="/" render={() => <Tutors />} />
            {/* <Route path="/tutors/manage" component={ManageTutors} /> */}
            {/* <Route path="/tutors/add" component={AddTutor} /> */}
            <Route exact path="/tutors/:id" render={() => <Profile />} />
            <Route exact path="/tutors/:id/review" render={() => <Review />} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getTutors: () => dispatch(getTutors()),
    getCourses: () => dispatch(getCourses())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
