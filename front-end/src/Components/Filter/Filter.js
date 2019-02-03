import React from 'react';
import './Filter.css';
import Box from '../Box/Box';

const Filter = ({coursesSet, updateTutorState}) => {
    
    const handleClick = (e) => {
        const courses = document.querySelectorAll(".box-component .box-component--title");
        const title = ['courses', 'rating', 'reviews'];

        // Test single parameter
        const courseParam = document.querySelector(".box-component .box-component--title").innerHTML;
        fetch(`http://137.142.172.24:3001/?course=${courseParam}`)
        .then(response => response.json())
        .then(data => {
            updateTutorState(data);
        })
        .catch((error) => {
            console.log(error);
        }); 

        [...courses].forEach((c, idx) => {
            c.innerHTML = title[idx];
        })

    }

    const ratingOptions= [1,2,3,4,5,6,7,8,9,10]

    console.log(coursesSet);
    return (
        <div className={"filter-component"}>
            <Box title={"courses"} boxOptions={coursesSet}/>
            <Box title={"rating"} boxOptions={ratingOptions}/>
            <Box title={"reviews"} boxOptions={coursesSet}/>
            <button onClick={handleClick}>Filter</button>
        </div>
    )
}

export default Filter;