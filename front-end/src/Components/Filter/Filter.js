import React from 'react';
import './Filter.css';
import Box from '../Box/Box';

const Filter = () => {
    
    const handleClick = (e) => {
        const courses = document.querySelectorAll(".box-component .box-component--title");
        [...courses].forEach(c => {
            console.log(c.innerHTML);
        })
    }

    return (
        <div className={"filter-component"}>
            <Box title={"courses"}/>
            <Box title={"rating"}/>
            <Box title={"reviews"}/>
            <button onClick={handleClick}>Filter</button>
        </div>
    )
}

export default Filter;