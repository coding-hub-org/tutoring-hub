import React from 'react';
import './TutorCard.css';
import testImage from '../../Assets/gaurav-img-test.png';

class TutorCard extends React.Component{
    render() {
        const {tutors} = this.props;

        const tutorList = tutors.map(tutor => {
            console.log(tutor);
            return(
                <div className={"tutorcard-component"}  key={tutor._id}>
                    <img src={testImage} alt=""/>
                    <div className={"tutorcard-component--wrapper"}>
                        <p>{tutor.firstName + "  " + tutor.lastName}</p>
                        <p className={"tutorcard-component--wrapper__description"}>
                            Jane is a chemistry tutor majoring in Medical Technologies with a minor in Math  and Biology. 
                        </p>
                        <a href={"/tutor/" + tutor._id}>MORE</a>
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