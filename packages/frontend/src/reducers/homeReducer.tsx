import {
	GET_TUTORS,
	GET_COURSES,
	RESET_FILTERS,
	FILTER_TUTORS_BY_COURSE,
	SEARCH_TUTOR,
	FILTER_TUTORS_BY_RATING
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
		case FILTER_TUTORS_BY_COURSE:
			return {
				...state,
				filterCourse: action.payload ? action.payload : ""
			};
		case FILTER_TUTORS_BY_RATING:
			return {
				...state,
				filterRating: action.payload <= 0 ? 0 : action.payload
			};
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
		case SEARCH_TUTOR:
			return {
				...state,
				filterName: action.payload
			};
		default:
			break;
	}
	return state;
};

export default homeReducer;
