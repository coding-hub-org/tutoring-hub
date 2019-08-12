import { GET_TUTORS } from "../actions/constants/homeConstants";

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
				...initState,
				tutors: action.payload,
				isLoading: false
			};
		default:
			break;
	}
	return state;
};

export default homeReducer;
