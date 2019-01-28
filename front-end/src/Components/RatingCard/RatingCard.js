import React from 'react';
import './RatingCard.css';

const RatingCard = ({reviews}) => {
    
    const getAvg = () => {
        let rating = 0, total, obj;

        reviews.forEach(review => {
            obj = review.statistics;
            total = (obj.methodology + obj.organization + obj.preparation + obj.knowlege + obj.clarity) / 5;
            rating += total;
        });
        
        return rating / reviews.length;
    }
    
    return(
        <div className={'ratingcard-component'}>
            <h1>{getAvg().toFixed(2)}</h1>
        </div>
    );
};

export default RatingCard;