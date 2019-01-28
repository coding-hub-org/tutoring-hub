import React from 'react';
import './Review.css';

import NavBar from '../../Components/NavBar/NavBar';
import Title from '../../Components/Title/Title';
import Questions from '../../Components/Questions/Questions';
import Subheading from '../../Components/Subheading/Subheading';
import Course from '../../Components/Course/Course';

class Review extends React.Component {

    state = {
        author: "Gaurav Jasawal",
        course: "BIO102",
        content: "Worst tutor in the world. DOn't book",
        overall: 1,
    }

    handleClick = () => {
        fetch('http://localhost:3001/tutor/test/5c4caeb4adfe464e643fa0d4', {
        method: 'PUT', 
        body: JSON.stringify(this.state), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .then(response => console.log('Success'))
        .catch(error => console.error('Error:', error));
    }

    render() {
        return(
            <div className={'review-section'}>
                <NavBar/>  
                <div className={'review-section--wrapper'}>
                    <Title title={'Rate Gaurav'}/>
                    <Questions handleClick={this.handleClick}/>             
                    <Subheading title={'About your session'}/>
                    <div>
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
                    </div>
                    <p>Class tutored </p>
                    <Subheading title={'Comments (Optional)'}/>
                    <textarea></textarea>
                    <button onClick={this.handleClick}>SUBMIT REVIEW</button>
                </div>        
            </div>
        );
    }
}

export default Review;