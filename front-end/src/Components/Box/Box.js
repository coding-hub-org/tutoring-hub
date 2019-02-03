import React from 'react';
import './Box.css';

const Box = ({title}) => {
    const handleClick = (e) => {
        const options = document.querySelectorAll(".box-component .box-component--field");
        if (options[0].style.display === "none") {
            for(let i = 0; i < options.length; i++) {
                options[i].style.display = "inline-block";
                options[i].style.pointerEvents = "all";
            }
        } else {
            for(let i = 0; i < options.length; i++) {
                options[i].style.display = "none";
                options[i].style.pointerEvents = "none";
            }
        }
    }

    const handleField = (e) => {
        const course = document.querySelector(".box-component .box-component--title");
        const options = document.querySelectorAll(".box-component .box-component--field");

        course.innerHTML = e.target.innerHTML;
        for(let i = 0; i < options.length; i++) {
            options[i].style.display = "none";
            options[i].style.pointerEvents = "none";
        }
    }

    return (
        <ul className={"box-component"}>
            <li onClick={handleClick} className="box-component--title">{title}</li>
            <li onClick={handleField} className="box-component--field">CSC102</li>
            <li onClick={handleField} className="box-component--field">CSC221</li>
            <li onClick={handleField} className="box-component--field">CSC217</li>
            <li onClick={handleField} className="box-component--field">CSC220</li>
            <li onClick={handleField} className="box-component--field">CSC309</li>
            <li onClick={handleField} className="box-component--field">CSC319</li>
        </ul>
    )
}

export default Box;