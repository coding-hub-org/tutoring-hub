import React from 'react';
import './QuestionTile.css';

const QuestionTile = ({parameter, updateStats}) => {

    const handleChange = (e) => {
        updateStats(e, e.target.value);
    }

    return (
        <div className={"questiontile-component"}>
            <p>{parameter}</p>            
            <div onChange={handleChange} className={"questiontile-component--wrapper"}>   
                    <input type="radio" className={"option-input radio"} value="1" name={parameter} />
                <label for="1">
                    1
                </label>
                    <input type="radio" className={"option-input radio"} value="2" name={parameter} />
                <label for="2">
                    2
                </label>
                    <input type="radio" className={"option-input radio"} value="3" name={parameter} />
                <label for="3">
                    3
                </label>
                    <input type="radio" className={"option-input radio"} value="4" name={parameter} />
                <label for="4">
                    4
                </label>
                    <input type="radio" className={"option-input radio"} value="5" name={parameter} />
                <label for="5">
                    5
                </label>
                    <input type="radio" className={"option-input radio"} value="6" name={parameter} />
                <label for="6">
                    6
                </label>
                    <input type="radio" className={"option-input radio"} value="7" name={parameter} />
                <label for="7">
                    7
                </label>
                    <input type="radio" className={"option-input radio"} value="8" name={parameter} />
                <label for="8">
                    8
                </label>
                    <input type="radio" className={"option-input radio"} value="9" name={parameter} />
                <label for="9">
                    9
                </label>
                    <input type="radio" className={"option-input radio"} value="10" name={parameter} />
                <label for="10">
                    10
                </label>
            </div>
        </div>
    );
}

export default QuestionTile;