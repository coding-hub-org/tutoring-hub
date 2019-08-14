import {
  FILTER_TUTORS_BY_COURSE,
  GET_TUTORS,
  GET_COURSES,
  RESET_FILTERS,
  SEARCH_TUTOR,
  FILTER_TUTORS_BY_RATING
} from "./constants/homeConstants";

import { sortBy } from "lodash";

export const filterTutorsByCourse = (course: string) => {
  return {
    type: FILTER_TUTORS_BY_COURSE,
    payload: course
  };
};

export const filterTutorsByRating = (rating: number) => {
  return {
    type: FILTER_TUTORS_BY_RATING,
    payload: rating
  };
};

export const searchTutor = (name: string) => {
  return {
    type: SEARCH_TUTOR,
    payload: name
  };
};

export const resetFilters = () => {
  return {
    type: RESET_FILTERS
  };
};

export const getTutors = () => {
  return async (
    dispatch: (arg: { type: string; payload: unknown[] }) => void
  ) => {
    try {
      const response = await fetch("/api/v1/tutors");
      const data = await response.json();
      dispatch({ type: GET_TUTORS, payload: sortBy(data, "lastName") });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCourses = () => {
  return async (
    dispatch: (arg: { type: string; payload: unknown[] }) => void
  ) => {
    try {
      const response = await fetch("/api/v1/courses");
      const data = await response.json();
      dispatch({ type: GET_COURSES, payload: sortBy(data, course => course) });
    } catch (error) {
      console.log(error);
    }
  };
};
