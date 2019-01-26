import React from 'react';
import './QuestionTile.css';

const QuestionTile = ({questions}) => {

    const handleClick = (e) => {
        console.log(e.target);
    }

    const questionList = questions.map((question, idx) => {
        return(
            <div className={"questiontile-component"} key={idx}>
                <p>{question}</p>            
                <div className={"questiontile-component--wrapper"}>     
                    <span onClick={handleClick}>1</span>
                    <span onClick={handleClick}>2</span>
                    <span onClick={handleClick}>3</span>
                    <span onClick={handleClick}>4</span>
                    <span onClick={handleClick}>5</span>
                    <span onClick={handleClick}>6</span>
                    <span onClick={handleClick}>7</span>
                    <span onClick={handleClick}>8</span>
                    <span onClick={handleClick}>9</span>
                    <span onClick={handleClick}>10</span>
                </div>
            </div>
        );
    });

    return (
        <div>
            {questionList}
        </div>
    );
}

export default QuestionTile;