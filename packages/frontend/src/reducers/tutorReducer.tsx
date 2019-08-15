import { FILTER_REVIEWS_BY_COURSE } from "../actions/constants/tutorConstants";
import { any } from "prop-types";

const initState = {
	filterName: "",
	filterCourse: "",
	filterRating: 0,
	loading: true
};

const tutorReducer = (state = initState, action: any) => {
	switch (action.type) {
		case FILTER_REVIEWS_BY_COURSE:
			return {
				...state,
				filterCourse: action.payload ? action.payload : ""
			};
		default:
			return state;
	}
};

export default tutorReducer;
