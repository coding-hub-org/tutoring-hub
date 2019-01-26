import React from 'react';
import './Questions.css';
import QuestionTile from '../QuestionTile/QuestionTile';

const Questions = () => {
    const questions = [
        "Methodology", 
        "Organization",
        "Preparation",
        "Clarity",
        "Knowledge of Material"
    ];
    return (
        <div>
            <QuestionTile questions={questions}/>
        </div>
    );
}

export default Questions;