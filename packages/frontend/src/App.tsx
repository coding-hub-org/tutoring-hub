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

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<BackToTopButton minScrollAmt={25} />
					<Switch>
						<Route exact path="/" render={() => <Tutors />} />
						{/* <Route path="/tutors/manage" component={ManageTutors} /> */}
						{/* <Route path="/tutors/add" component={AddTutor} /> */}
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
