import { combineReducers } from "redux";
import tutorReducer from "./tutorReducer";
import homeReducer from "./homeReducer";

// const initState = {
// 	title: "All Tutors",
// 	isLoading: true,
// 	tutors: [],
// 	courses: [],
// 	filterName: "",
// 	filterCourse: "",
// 	filterRating: 0
// };

// const rootReducer = (state = initState, action: any) => {
// 	return state;
// };

const rootReducer = combineReducers({
	home: homeReducer,
	tutor: tutorReducer
});

export default rootReducer;
