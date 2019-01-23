import React from 'react';
import './Tutors.css';
import TutorCard from '../TutorCard/TutorCard';

class Tutors extends React.Component{
    render() {
        return (
            <div className={"tutors-component"}>
                <TutorCard tutor={'Gaurav Jayasawal'}/>
                <TutorCard tutor={'Gonzalo Reyes'}/>
                <TutorCard tutor={'Hung Nguyen'}/>
                <TutorCard tutor={'Hung Nguyen'}/>
                <TutorCard tutor={'Hung Nguyen'}/>
                <TutorCard tutor={'Hung Nguyen'}/>
                <TutorCard tutor={'Hung Nguyen'}/>

            </div>
        );
    }
}

export default Tutors;