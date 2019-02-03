import React from 'react';
import './Box.css';

const Box = ({title, boxOptions}) => {
    const handleClick = (e) => {
        const options = document.querySelectorAll(`.box-component .box-component--field.${title}`);
        for(let i = 0; i < options.length; i++) {
                options[i].style.display = "inline-block";
                options[i].style.pointerEvents = "all";
            }
    }

    const handleField = (e) => {
        const boxTitle = document.querySelector(`.box-component .box-component--title.${title}`);
        const options = document.querySelectorAll(`.box-component .box-component--field.${title}`);
        boxTitle.innerHTML = e.target.innerHTML;
        for(let i = 0; i < options.length; i++) {
            options[i].style.display = "none";
            options[i].style.pointerEvents = "none";
        }
    }

    const optionsList = boxOptions.map((option, idx) => {
        return (
            <li onClick={handleField} className={`box-component--field ${title}`} key={idx}>{option}</li>
        )
    });
    return (
        <ul className={"box-component"}>
            <li onClick={handleClick} className={`box-component--title ${title}`}>{title}</li>
            {optionsList}
        </ul>
    )
}

export default Box;