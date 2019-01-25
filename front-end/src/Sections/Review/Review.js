import React from 'react';
import './Review.css';

import NavBar from '../../Components/NavBar/NavBar';
import Title from '../../Components/Title/Title';

const Review = () => {
    return(
        <div className={'review-section'}>
            <NavBar/>  
            <div className={'review-section--wrapper'}>
                <Title title={'Rate Gaurav'}/>
                <h1>HEY THERE</h1>
            </div>        
        </div>
    );
}

export default Review;