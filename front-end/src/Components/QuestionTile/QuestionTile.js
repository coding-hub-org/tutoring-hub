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
                <label>
                    <input type="radio" className={"option-input radio"} value="1" name={parameter} /> 1
                </label>
                <label>
                    <input type="radio" className={"option-input radio"} value="2" name={parameter} /> 2
                </label>
                <label>
                    <input type="radio" className={"option-input radio"} value="3" name={parameter} /> 3
                </label>
                <label>
                    <input type="radio" className={"option-input radio"} value="4" name={parameter} /> 4
                </label>
                <label>
                    <input type="radio" className={"option-input radio"} value="5" name={parameter} /> 5
                </label>
                <label>
                    <input type="radio" className={"option-input radio"} value="6" name={parameter} /> 6
                </label>
                <label>
                    <input type="radio" className={"option-input radio"} value="7" name={parameter} /> 7
                </label>
                <label>
                    <input type="radio" className={"option-input radio"} value="8" name={parameter} /> 8
                </label>
                <label>
                    <input type="radio" className={"option-input radio"} value="9" name={parameter} /> 9
                </label>
                <label>
                    <input type="radio" className={"option-input radio"} value="10" name={parameter} /> 10
                </label>
            </div>
        </div>
    );
}

export default QuestionTile;