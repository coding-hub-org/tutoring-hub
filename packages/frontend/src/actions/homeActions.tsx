import { FILTER_TUTORS_BY_COURSE, GET_TUTORS } from "./constants/homeConstants";

export const filterTutorsByCourse = (course: string) => {
	return {
		type: FILTER_TUTORS_BY_COURSE,
		course
	};
};

export const getTutors = () => {
	return async (
		dispatch: (arg: { type: string; payload: unknown[] }) => void,
		getState: any
	) => {
		try {
			const response = await fetch("/api/v1/tutors");
			const data = await response.json();
			dispatch({ type: GET_TUTORS, payload: data });
		} catch (error) {
			console.log(error);
		}
	};
};
