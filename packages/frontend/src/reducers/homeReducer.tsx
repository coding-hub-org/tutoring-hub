import {
	GET_TUTORS,
	GET_COURSES,
	RESET_FILTERS
} from "../actions/constants/homeConstants";

const initState = {
	title: "All Tutors",
	isLoading: true,
	tutors: [],
	courses: [],
	filterName: "",
	filterCourse: "",
	filterRating: 0
};

const homeReducer = (state = initState, action: any) => {
	switch (action.type) {
		case GET_TUTORS:
			return {
				...state,
				tutors: action.payload,
				isLoading: false
			};

		case GET_COURSES:
			return {
				...state,
				courses: action.payload
			};
		case RESET_FILTERS:
			return {
				...state,
				filterName: "",
				filterCourse: "",
				filterRating: 0
			};
		default:
			break;
	}
	return state;
};

export default homeReducer;
