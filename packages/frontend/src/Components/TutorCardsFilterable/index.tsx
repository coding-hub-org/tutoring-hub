import React, { Component } from "react";
import "./style.scss";

import TutorCardPartial from "../TutorCardPartial";
import TutorNotFound from "../TutorNotFound";

interface Props {
  tutors: any[];

  filterCourse: string;
  filterRating: number;
  filterName: string;
}

export default class TutorCardsFilterable extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  getRating = (ratings: any[]) => {
    let rating = 0,
      total,
      obj;

    if (ratings.length === 0) return -1;
    ratings.forEach(review => {
      obj = review.statistics;
      total =
        (obj.methodology +
          obj.organization +
          obj.preparation +
          obj.knowledge +
          obj.clarity) /
        5;
      rating += total;
    });

    return rating / ratings.length;
  };

  render() {
    let tutors = this.props.tutors;

    tutors = tutors.filter(tutor => {
      var rating = this.getRating(tutor.reviews);
      return (
        (this.props.filterCourse === "" ||
          tutor.courses.includes(this.props.filterCourse)) &&
        (this.props.filterRating === 0 || rating >= this.props.filterRating) &&
        (this.props.filterName === "" ||
          (
            tutor.firstName.toLowerCase() +
            " " +
            tutor.lastName.toLowerCase()
          ).includes(this.props.filterName.toLowerCase()))
      );
    }, this);

    let cards = tutors.map(tutor => (
      <TutorCardPartial tutor={tutor} key={tutor._id} />
    ));

    if (cards.length === 0) {
      return <TutorNotFound />;
    }

    return <div className={"Tutor-Cards-Component"}>{cards}</div>;
  }
}
