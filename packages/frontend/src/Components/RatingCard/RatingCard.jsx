import React from "react";
import "./RatingCard.css";
import ratingStar from "../../Assets/rating-star.svg";

const RatingCard = ({ reviews }) => {
	const getAvg = () => {
		let rating = 0,
			total,
			obj;

		if (reviews.length === 0) return -1;
		reviews.forEach(review => {
			obj = review.statistics;
			total =
				(obj.methodology +
					obj.organization +
					obj.preparation +
					obj.knowlege +
					obj.clarity) /
				5;
			rating += total;
		});

		return rating / reviews.length;
	};

	return (
		<div className={"ratingcard-component"}>
			<img src={ratingStar} alt="" />
			{getAvg() === -1 ? <h1>N/A</h1> : <h1>{getAvg().toFixed(2)}</h1>}
			<p>Overall</p>
		</div>
	);
};

export default RatingCard;
