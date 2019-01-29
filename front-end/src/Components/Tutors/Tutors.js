import React from 'react';
import './Tutors.css';
import TutorCard from '../TutorCard/TutorCard';

const Tutors = ({tutors}) => {    
    return(
        <div className={"tutors-component"}>
            <TutorCard tutors={tutors}/>
        </div>
    );
}

export default Tutors;