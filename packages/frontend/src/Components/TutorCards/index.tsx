import React from "react";
import "./style.scss";

import TutorCardPartial from "../TutorCardPartial";

interface TutorCardsProps {
	tutors: any[];
}

const TutorCards: React.FC<TutorCardsProps> = ({ tutors }) => {
	const tutorsList = tutors.map(tutor => (
		<TutorCardPartial tutor={tutor} key={tutor._id} />
	));

	return <div className={"Tutor-Cards-Component"}>{tutorsList}</div>;
};

export default TutorCards;
