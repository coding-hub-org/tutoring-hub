import React from 'react';
import './Course.css';

const Course = ({courses}) => {
    
    const courseList = courses.map((course, idx) => {
        return (
            <div className={'course-component'} key={idx} >
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