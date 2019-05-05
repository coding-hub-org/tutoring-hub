import React from 'react';
import './Course.css';
const Course = ({courses, func}) => {
    
    const onClickFunc = (course) =>
    {
        func(course);
        let getClick = document.querySelector(`.js-${course}`);
        let getActive = document.querySelector('.active');
        getClick.classList.toggle("active");
        if (getActive===null) return;
        if (getActive===getClick) return;
        getActive.classList.toggle("active");
        
    }
    const courseList = courses.map((course, idx) => {
        return (
            <div className={`course-component js-${course}`} key={idx} onClick={(e) =>{
        onClickFunc(course);
        }}>
                <p>{course}</p>
            </div>
        );
    });
    
    return(
        <div className={'course-component-wrapper'}>
            {courseList}
        </div>
    );
}

export default Course;