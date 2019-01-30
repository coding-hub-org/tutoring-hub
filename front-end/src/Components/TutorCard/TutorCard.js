import React from 'react';
import './TutorCard.css';
import testImage from '../../Assets/gaurav-img-test.png';
import testImage2 from '../../Assets/swornim-img-test.jpg';
import testImage3 from '../../Assets/tran-img-test.jpg';
import testImage4 from '../../Assets/michelle-img-test.jpg';

import {Link} from 'react-router-dom';

class TutorCard extends React.Component{
    render() {
        const {tutors} = this.props;

        const getTutor = (name) => {
            if (name === "Tran") return testImage3
            else if (name === "Swornim") return testImage2
            else if (name === "Michelle") return testImage4
            else {
                return testImage
            }
        }
    
        const tutorList = tutors.map((tutor, idx) => {
            return(
                <div className={"tutorcard-component"}  key={tutor._id}>
                    <img src={getTutor(tutor.firstName)} alt=""/>
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