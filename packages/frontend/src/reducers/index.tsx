import { combineReducers } from "redux";

const initState = {
	title: "All Tutors REDUX TEST",
	isLoading: true,
	tutors: [],
	courses: [],
	filterName: "",
	filterCourse: "",
	filterRating: 0
};

const rootReducer = (state = initState, action: any) => {
	return state;
};

export default rootReducer;
