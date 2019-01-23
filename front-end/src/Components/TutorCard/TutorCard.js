import React from 'react';
import './TutorCard.css';
import testImage from '../../Assets/gaurav-img-test.png';

class TutorCard extends React.Component{
    render() {
        return (
            <div className={"tutorcard-component"}>
                <img src={testImage} alt=""/>
                <div className={"tutorcard-component--wrapper"}>
                    <p>{this.props.tutor}</p>
                    <p className={"tutorcard-component--wrapper__description"}>
                        Jane is a chemistry tutor majoring in Medical Technologies with a minor in Math  and Biology. 
                    </p>
                    <button>MORE</button>
                </div>
            </div>
        );
    }
}

export default TutorCard;