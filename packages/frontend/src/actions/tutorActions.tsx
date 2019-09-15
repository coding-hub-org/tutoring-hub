import { FILTER_REVIEWS_BY_COURSE } from "./constants/tutorConstants";

export const filterReviewsByCourse = (course: string) => {
	return { type: FILTER_REVIEWS_BY_COURSE, payload: course };
};
