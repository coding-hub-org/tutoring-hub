import React from 'react';
import './style.scss';

interface Props {
    courses: any[];
}

export default function Course(props: Props) {

    const courseList = props.courses.map((course, idx) => {
        return (
            <div className={'course-component'} key={idx} >
                <p>{course}</p>
            </div>
        );
    });

    return (
        <div className={'course-component-wrapper'}>
            {courseList}
        </div>
    );
}