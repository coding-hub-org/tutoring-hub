import React from 'react';
import './RatingCard.css';

const RatingCard = ({reviews}) => {
    
    const getAvg = () => {
        let total = 0;
        reviews.forEach(review => {
            total += review.overall;
        });
        return total / reviews.length;
    }
    

    return(
        <div className={'ratingcard-component'}>
            <h1>{getAvg().toFixed(2)}</h1>
        </div>
    );
};

export default RatingCard;