import {
	GET_TUTOR_INFO,
	FILTER_REVIEWS_BY_COURSE
} from "./constants/tutorConstants";

export const getTutorInfo = (url: string) => {
	return async (
		dispatch: (arg: { type: string; payload: unknown[] }) => void
	) => {
		try {
			const response = await fetch(`/api/v1/${url}`);
			const data = await response.json();
			dispatch({ type: GET_TUTOR_INFO, payload: data });
		} catch (error) {
			console.log(error);
		}
	};
};

export const filterReviewsByCourse = (course: string) => {
	return { type: FILTER_REVIEWS_BY_COURSE, payload: course };
};
