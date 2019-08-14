import React, { Component } from "react";
import "./style.scss";
import titleImg from "../../Assets/title-img.svg";

// Import components
import NavBar from "../../Components/NavBar";
import Title from "../../Components/Title";
import TutorCards from "../../Components/TutorCards";
import TutorCardsFilterable from "../../Components/TutorCardsFilterable";
import FormDropdown from "../../Components/FormDropdown";
import FormSlider from "../../Components/FormSlider";
import FormButton from "../../Components/FormButton";
import AddTutorBox from "../../Components/AddTutorBox";
import ReviewWebsiteButton from "../../Components/ReviewWebsite";

// Redux
import { connect } from "react-redux";
import {
  getTutors,
  getCourses,
  resetFilters,
  filterTutorsByCourse,
  searchTutor,
  filterTutorsByRating
} from "../../actions/homeActions";

interface TutorsProps {
  courses: string[];
  filterName: string;
  filterCourse: string;
  filterRating: number;
  filterTutorsByCourse: Function;
  filterTutorsByRating: Function;
  resetFilters: Function;
  searchTutor: Function;
  isLoading: boolean;
  title: string;
  tutors: any[];
}

const Tutors: React.FC<TutorsProps> = props => {
  const handleSearch = (e: any) => {
    let name = e.currentTarget.value;
    props.searchTutor(name);
  };

  const resetFilters = (e: any) => {
    e.preventDefault();
    //TODO reset HTML for elements
    props.resetFilters();
  };

  const filterCourses = (course: string) => {
    props.filterTutorsByCourse(course);
  };

  const filterRatings = (rating: number) => {
    props.filterTutorsByRating(rating);
  };

  const isFiltering = () => {
    return (
      props.filterCourse !== "" ||
      props.filterRating !== 0 ||
      props.filterName !== ""
    );
  };

  return (
    <>
      <NavBar searchable={true} handleSearch={handleSearch} sticky={true} />
      <section id="section-tutors">
        <div className="wrapper">
          <div className="section-title">
            <img src={titleImg} alt="title icon" />
            <Title title={props.title.toUpperCase()} />
          </div>

          <div className="filters">
            <div className="filter">
              <p className="title">Courses</p>
              <FormDropdown
                title={"Courses"}
                options={props.courses}
                onChange={filterCourses}
                value={props.filterCourse}
                uppercase={true}
              />
            </div>
            <div className="filter">
              <p className="title">Rating</p>
              <FormSlider
                min={0}
                max={10}
                step={1}
                onChange={filterRatings}
                value={props.filterRating}
              />
            </div>
            <div className="filter" id="filter-submit">
              <FormButton title={"Reset Filters"} action={resetFilters} />
            </div>
          </div>

          {isFiltering() ? (
            <TutorCardsFilterable
              tutors={props.tutors}
              filterCourse={props.filterCourse}
              filterRating={props.filterRating}
              filterName={props.filterName}
            />
          ) : (
            <TutorCards tutors={props.tutors} />
          )}

          <div className="review-website-button">
            <ReviewWebsiteButton />
          </div>

          {/* <AddTutorBox /> */}
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    title: state.home.title,
    tutors: state.home.tutors,
    isLoading: state.home.isLoading,
    courses: state.home.courses,
    filterName: state.home.filterName,
    filterCourse: state.home.filterCourse,
    filterRating: state.home.filterRating
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    resetFilters: () => dispatch(resetFilters()),
    filterTutorsByCourse: (course: string) =>
      dispatch(filterTutorsByCourse(course)),
    filterTutorsByRating: (rating: number) =>
      dispatch(filterTutorsByRating(rating)),
    searchTutor: (name: string) => dispatch(searchTutor(name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tutors);
