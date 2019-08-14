import React from "react";
import "./style.scss";
import ratingStar from "../../Assets/rating-star.svg";

interface Props {
  reviews: any[];
}

export default function RatingCard(props: Props) {
  const getAvg = () => {
    let rating = 0,
      total,
      obj;

    if (props.reviews.length === 0) return -1;
    props.reviews.forEach(review => {
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

    return rating / props.reviews.length;
  };

  return (
    <div className={"ratingcard-component"}>
      <img src={ratingStar} alt="" />
      {getAvg() === -1 ? <h1>N/A</h1> : <h1>{getAvg().toFixed(2)}</h1>}
      <p>Overall</p>
    </div>
  );
}
