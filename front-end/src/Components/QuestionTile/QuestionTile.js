import React from 'react';
import './QuestionTile.css';

const QuestionTile = ({questions, updateStatsState}) => {
    let answers = Array(5);
    
    const checkSelected = (index, element, event) => {
        element = document.querySelector(`.section${index}.checked`);
        if (element) {
            element.classList.remove('checked');
            event.target.classList.add('checked');
        } else {
            event.target.classList.add('checked');
        }
        answers[index] = Number(event.target.innerHTML);
        updateStatsState(answers);
    }
    
    const handleClick = (e) => {
        let selected;
        switch(e.target.classList[0]) {
            case 'section0':
                checkSelected(0, selected, e);
                break;
            case 'section1':
                checkSelected(1, selected, e);
                break;
            case 'section2':
                checkSelected(2, selected, e);
                break;
            case 'section3':
                checkSelected(3, selected, e);
                break;
            default:
                checkSelected(4, selected, e);
                break;
        }
    }


    const questionList = questions.map((question, idx) => {
        return(
            <div className={"questiontile-component"} key={idx}>
                <p>{question}</p>            
                <div className={"questiontile-component--wrapper"}>     
                    <span className={`section${idx}`} onClick={handleClick}>1</span>
                    <span className={`section${idx}`} onClick={handleClick}>2</span>
                    <span className={`section${idx}`} onClick={handleClick}>3</span>
                    <span className={`section${idx}`} onClick={handleClick}>4</span>
                    <span className={`section${idx}`} onClick={handleClick}>5</span>
                    <span className={`section${idx}`} onClick={handleClick}>6</span>
                    <span className={`section${idx}`} onClick={handleClick}>7</span>
                    <span className={`section${idx}`} onClick={handleClick}>8</span>
                    <span className={`section${idx}`} onClick={handleClick}>9</span>
                    <span className={`section${idx}`}onClick={handleClick}>10</span>
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