import React from 'react';
import './TutorCard.css';
import {Link} from 'react-router-dom';

class TutorCard extends React.Component{
    render() {
        const {tutors} = this.props;
        const tutorList = tutors.map(tutor => {
            return(
                <div className={"tutorcard-component"}  key={tutor._id}>
                    <img src={tutor.imageUrl} alt=""/>
                    <div className={"tutorcard-component--content"}>
                        <p>{tutor.firstName + "  " + tutor.lastName}</p>
                        <p className={"tutorcard-component--content__description"}>
                            Jane is a chemistry tutor majoring in Medical Technologies with a minor in Math  and Biology. 
                        </p>
                        <Link to={`/tutor/${tutor._id}`}>MORE</Link>
                    </div>
                </div>
            )
        });
        return (
            <div className={'tutorcard-component--wrapper'}>
                {tutorList}
            </div>
        );
        
    }
}

export default TutorCard;