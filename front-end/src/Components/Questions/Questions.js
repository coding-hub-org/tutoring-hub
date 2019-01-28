import React from 'react';
import './Questions.css';
import QuestionTile from '../QuestionTile/QuestionTile';

const Questions = ({updateStatsState}) => {
    const questions = [
        "Methodology", 
        "Organization",
        "Preparation",
        "Clarity",
        "Knowledge of Material"
    ];

    
    return (
        <div>
            <QuestionTile questions={questions} updateStatsState={updateStatsState}/>
        </div>
    );
}

export default Questions;