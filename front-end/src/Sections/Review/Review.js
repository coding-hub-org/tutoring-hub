import React from 'react';
import './Review.css';

import NavBar from '../../Components/NavBar/NavBar';
import Title from '../../Components/Title/Title';
import Questions from '../../Components/Questions/Questions';
import Subheading from '../../Components/Subheading/Subheading';
import Course from '../../Components/Course/Course';

class Review extends React.Component {
    render() {
        return(
            <div className={'review-section'}>
                <NavBar/>  
                <div className={'review-section--wrapper'}>
                    <Title title={'Rate Gaurav'}/>
                    <Questions/>             
                    <Subheading title={'About your session'}/>
                    <p>Would you book this tutor again? </p>
                    <div className={"review-section--wrapper__bookagain"}>     
                        <div>
                            <p>YES</p> 
                            <span></span>
                        </div>
                        <div>
                            <p>NO</p> 
                            <span></span>
                        </div>
                    </div>
                    <p>Class tutored </p>
                    <Subheading title={'Comments (Optional)'}/>
                    <textarea></textarea>
                </div>        
            </div>
        );
    }
}

export default Review;