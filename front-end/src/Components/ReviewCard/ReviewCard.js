import React from 'react';
import './ReviewCard.css';

const ReviewCard = () => {
    return(
        <div className={"reviewcard-component"}>
            <div className={"reviewcard-component--wrapper"}>       
                <div className={"reviewcard-component--wrapper__rating"}>       
                    <p>RATING</p>
                    <h1>4.2</h1>
                </div>
                <div className={"reviewcard-component--wrapper__description"}>       
                    <h1>Anonymous</h1>
                    <section className={"reviewcard-component--details"}>
                        <h3>CSC443</h3>
                        <h3>01/25/2019</h3>
                    </section>
                    <p>User Experience is much wider than User Interface and refers to 
                        designing apps in a way that optimizes usability and accessibility. 
                        The overriding aim of a good UX is customer delight, or delivering 
                        maximum possible pleasure to the users interacting with the app.</p>
                </div>
            </div>
        </div>
    )

}

export default ReviewCard;